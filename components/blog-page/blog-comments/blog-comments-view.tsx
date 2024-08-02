"use client";

import { dateFormatter } from "@/lib/contentful/helpers/common";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { TbMessageReply } from "react-icons/tb";
import { fetchComments, hasCommentsTable } from "./actions";
import PostComment from "./post-comment";

export interface CommentProps {
  id: string;
  postid: string;
  name: string;
  email: string;
  comment: string;
  createdtime: string;
  parentid?: string;
  replies?: CommentProps[];
}

interface CommentComponentProps {
  comment: CommentProps;
  entryId: string;
  parentId?: any;
  level?: number;
}

// Recursive function to sort nested comments
function sortNestedComments(comment: any) {
  // Convert createdTime to Date for sorting
  comment.replies.sort((a: any, b: any) => {
    const dateA = new Date(a.createdTime);
    const dateB = new Date(b.createdTime);
    return dateA.getTime() - dateB.getTime(); // Compare timestamps
  });

  // Recursively sort each reply's replies
  comment.replies.forEach(sortNestedComments);
}

function nestComments(comments: CommentProps[]): CommentProps[] {
  const map: { [key: string]: CommentProps } = {};
  const roots: CommentProps[] = [];

  comments.forEach((comment) => {
    map[comment.id] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentid) {
      map[comment.parentid]?.replies?.push(map[comment.id]);
    } else {
      roots.push(map[comment.id]);
    }
  });

  // Sort replies and roots
  roots.forEach(sortNestedComments);
  return roots;
}

interface BlogCommentsViewProps {
  // comments: CommentProps[];

  entryId: string;
}

const BlogCommentsView: FC<BlogCommentsViewProps> = ({ entryId }) => {
  const pathname = usePathname();
  const [nestedComments, setNestedComments] = useState<CommentProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasCommentsTableConfigured, setHasCommentsTableConfigured] =
    useState<boolean>(false);

  const [loadingComments, setLoadingComments] = useState(true);
  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const fetchedComments = await fetchComments(entryId);
      // setComments(fetchedComments);
      setLoadingComments(false);
      setNestedComments(nestComments(fetchedComments as any));
    } catch (error) {
      console.error(error);
      setLoadingComments(false);
    }
  };
  useEffect(() => {
    const checkTable = async () => {
      try {
        const hasCmntTable = await hasCommentsTable();

        setHasCommentsTableConfigured(hasCmntTable);
      } catch (error) {}
    };

    checkTable();

    return () => {};
  }, []);

  useEffect(() => {
    loadComments();

    return () => {};
  }, [entryId]);



  return (
    <div>
      {hasCommentsTableConfigured && (
        <section className=" py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold  ">
                Comments ({nestedComments.length})
              </h2>
            </div>
            <PostComment
              parentId={null}
              comment={nestedComments[0]}
              entryId={entryId}
            loadComments={loadComments}

            />

            <div className="flex flex-col gap-4">
              {/* <CommentSkeleton /> */}
              {nestedComments.length > 0 ? (
                nestedComments.map((comment) => (
                  <Comment
                    entryId={entryId}
                    key={comment.id}
                    comment={comment}
                  />
                ))
              ) : (
                <>
                  {loadingComments ? (
                    <div>
                      <CommentSkeleton />
                    </div>
                  ) : (
                    <p>No comments available</p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const Comment: FC<CommentComponentProps> = ({
  comment,
  entryId,
  parentId,
  level = 0,
}) => {
  const date = new Date(comment?.createdtime);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const createdAt = dateFormatter(date);

  return (
    <div className="flex flex-col bg-blend-darken rounded-lg px-2 mt-2">
      <article className={`border-t border-1 shadow-md  ${level > 0 ? "hover:bg-primary-50/40" : "border-gray-200 dark:border-gray-700"}  rounded-lg  p-6 mb-3x mt-3 text-base `}>
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900x font-semibold">
              <span className="bg-secondary mr-2 w-6 h-6 rounded-full"></span>

              {comment.name}
            </p>
            <p className="text-xs text-foreground/80 ">
              <time dateTime={createdAt} title={createdAt}>
                {createdAt}
              </time>
            </p>
          </div>
          <div className="hidden lg:block">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" isIconOnly>
                <BsThreeDots />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu">
              <DropdownItem color="danger" key="report">
                Report
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </div>
        
        </footer>
        <p className="">{comment.comment}</p>
        {/* {level < 2 && (
          <div className="flex items-center mt-4 mb-2 space-x-4">
            <Button
              onClick={() => setShowReplyBox(!showReplyBox)}
              variant="light"
            >
              <div className="gap-2 flex items-center justify-items-center">
                <TbMessageReply />
                <span>Reply</span>
              </div>
            </Button>
          </div>
        )} */}

        {/* {showReplyBox && (
          <PostComment
            parentId={comment?.id}
            comment={comment}
            entryId={entryId}
          />
        )} */}
      </article>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12  flex flex-col gap-1 ">
          {comment.replies.map((reply) => {
            return (
              <div key={reply.id} className=" ">
                <Comment
                  parentId={comment?.id}
                  comment={reply}
                  entryId={entryId}
                  level={level + 1}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="">
        {level < 2 && (
          <div className="flex items-center mt-4 mb-2 space-x-4 ">
            <Button
              onClick={() => setShowReplyBox(!showReplyBox)}
              variant="light"
              color="success"
            >
              <div className="gap-2 flex items-center justify-items-center">
                <TbMessageReply />
                <span>Reply</span>
              </div>
            </Button>
          </div>
        )}
        {showReplyBox && (
          <PostComment
            parentId={comment?.id}
            comment={comment}
            entryId={entryId}
          />
        )}
      </div>
    </div>
  );
};

const CommentSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 w-full ">
        <article className="border-t flex flex-col gap-4 p-6 mb-3 text-base">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="rounded-lg">
                <p className="inline-flex items-center mr-3 text-sm  font-semibold">
                  <span className="bg-secondary mr-2 w-6 h-6 rounded-full"></span>

                  {"comment.name"}
                </p>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <p className="text-sm ">
                  <time dateTime={"createdAt"} title={"createdAt"}>
                    {"createdAt"}
                  </time>
                </p>
              </Skeleton>
            </div>

            <Skeleton className="rounded-lg">
              <Button size="sm" variant="bordered" isIconOnly>
                <BsThreeDots />
              </Button>
            </Skeleton>
          </footer>

          <Skeleton className="rounded-lg">
            <p className="h-20">comment</p>
          </Skeleton>
          <div className="flex items-center mt-4 mb-2 space-x-4">
            <Button variant="light">
              <div className="gap-2 flex items-center justify-items-center">
                <Skeleton className="rounded-lg">
                  <TbMessageReply />
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <span>Reply</span>
                </Skeleton>
              </div>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogCommentsView;

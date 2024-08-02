"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { usePathname } from "next/navigation";
import { createComment } from "./actions";
import { CommentProps } from "./blog-comments-view";

const PostComment = ({
  comment,
  entryId,
  parentId = null,
  loadComments = () => {},
}: {
  comment: CommentProps;
  entryId: string;
  parentId?: any;
  loadComments?: () => void;
}) => {
  const pathname = usePathname();
  const reloadComments = () => {
    alert("reload");
  };

  const createCommentWithEntryId = createComment.bind(
    null,
    entryId,
    parentId,
    pathname
  );

  return (
    <div>
      <form
        className="mb-6 flex flex-col gap-4"
        action={createCommentWithEntryId}
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            variant="bordered"
            type="text"
            label="Name"
            name="name"
            isRequired
          />
          <Input
            variant="bordered"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <Textarea
            id="comment"
            name="comment"
            label="Comment"
            className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            required
            defaultValue=""
            variant="bordered"
            isRequired
          />
        </div>
        <Button type="submit" color="primary">
          Post comment
        </Button>
      </form>
    </div>
  );
};

export default PostComment;

# Contentful & Next.js & NextUI Personal Site Example

If you want to quickly create a personal website using Contentful with minimal software development effort, this guide is for you. Follow these steps to explore the Contentful platform with your own personal site.


## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)



# What You Need

To get started, you'll need the following:

- A [Github](https://github.com) account

- A Contentful space

****


# Prepare Your Space

You'll need an empty Contentful space. Contentful offers a free space for personal use called an "Intro space" when you create an account.

****

1. ## Login to Contentful

   1. Visit [Contentful’s](https://be.contentful.com/login) website, and set up an account if you don’t have one.

2) ## API Keys

Copy and securely save your Space ID and API access tokens.

1. Click on **Settings** then **API keys**                                               \
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdKvrAf2GAqRYqEVYBSv3rLXTudb1-nKuufntImvKtRv0IkhlsM4V3mEy8G1OXLzlc397KPL67WOrYfMH85f0gMCEn0zzOnMiI6ViFrV624QHa8NMdkw5gh8FzVgaWyfSt-aeAMyScK9g0sk1pjbqKF6uqS?key=pPevqAhga8cnSiLoyVH5BQ)

2. ### Add an API key by navigating to Settings > API keys and clicking on the "Add API Key" button. ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdt2cWqf-ey3v_pblUm4cSQOcWcUuRU-DLypffAi7DMso4bB1OgFRIfmE_9gZ80JWWZRK4Qtt1yI-6AbxQDymluLNtD9k3iXlyCpJoWp6Gjdh2WdZoAfLWrg9N7txFirW1E-fgcuJCWTkEN27wemXA8aTGF?key=pPevqAhga8cnSiLoyVH5BQ)

3. Copy and securely save your Space ID, Delivery API access token, and Preview API access token to your notepad or another safe location on your computer for future use.\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXcgYKmpANr-qUITQahDmh1vZCAryy3AVE0KCk2pTSXL9oPKS-l-wp_-E0JlbrvBGklFpKsVsLc5w4VI0W6FpeyrCpHRGuWzdbHuGTu1U6avRk_cLDPDzO0v9Qu-iP521KNa7AyCPxcNLzhWP6j3qp7oQ3uJ?key=pPevqAhga8cnSiLoyVH5BQ)

3) ## CMA token

Create a temporary CMA (Content Management API) token and ensure it is set to expire as soon as possible.

1. Click on Settings > CMA Tokens.\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfA7vzkdDyIoMeF08jyEvrpdeeQ7fAfzaj5WucyNtWsWT5ra4BMIJKRK3sObSKJIQUW2Zr0DaDuhzvGh1Iu50rEbEYyBU5XobrXR3IU6kLjyA1rBpWIWaFPqPQZyIJzdz1l6VuhOnKhyaG6IxhxgFgVEUUL?key=pPevqAhga8cnSiLoyVH5BQ)

2. Create a personal access token and be sure to set an expiration date.\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfs2_2tTX3rnMbsshLnVUFzGKyBCxUE88nsw1ELuQg2z8mRC72eTpMR_Y81SJwyOA7vmnD3TA8oQLRQOzHGOJ2wWxP8FA_KtQ4ck561_PODRppTyfICk5x2OnPhLBxQmVKktJptCxcJeqRKdakwzdsAnXMw?key=pPevqAhga8cnSiLoyVH5BQ)

4) Setup Contentful Pexels integration

   1. Install the Contentful Pexels app to your new space. Click [here](https://app.contentful.com/deeplink?link=apps\&id=3ES1ceGZlYqle9OVgllxoP)   \
      ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXcqI5A1iYGJjHe4eZ37N2Zuv5BK1tXEKsIhQZ3LKZHdmFpKSZ1VU62OV1yZQ-v-RLA1wdD2FcFd2vowvkwW15k8ngbRBabrGl1LNn5W3T_ksKJdi6irXFsQK2b-TIaAUeN6fZpn2zHvCKUrJHJUKZEpiqw3?key=pPevqAhga8cnSiLoyVH5BQ)

****


# Add Model and Sample Content to Your Space

Content modeling is a crucial aspect of using Contentful. To get you started, I've created a content model complete with sample content. You can easily populate your space using this [tool](https://ctf.chigoriddim.com/xsetup/seed-space).

****

- Enter your space id

- Enter your management access token

- Enter your environment ID or simply type "master"

- Click on “Setup", this would add content to your empty space.

****


# Github Setup

Set up a GitHub account if you don't have one and log in. Fork the following repository by clicking on the "Fork" button.

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXclqUq2CoWaw56QlmwmjKb2I41AqUpXN7He7uR9okGyKOouxUKE4CjAQkpNocXNQrBVRzZvBS3Y7PPYJ1LXpe7efGswr_C1s70aV47MSjuX5ApjS0Z1wrsaK9a3EKqaWASjtYLwkHV09fVntv3UK0wndg4?key=pPevqAhga8cnSiLoyVH5BQ)

****

1. Click on the dropdown menu and choose "Create a new fork" to create a new fork of the repository.\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeXLLC1Jh7wPBM-2ZUDEmRZbZt-4SKxMOioV1luABbHVDhYKcnJFIu0gHiDFIXoJj-yWmcfuXwL7_62jWq8SsdBO8nOKgvL2embF2gNOPyQyEkxZdBu9RbPuH-6Z6lZRm42u7SKueXVdr1f1cdrvKPjy2vs?key=pPevqAhga8cnSiLoyVH5BQ)

2. You can change the repository name to your desired name. Then click “Create fork”\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXcWWycHGQ_UDCvUhxKfw-WrnW57jhRquMQmzypjY2VhDXx2CL-gdFoeRNFFeM9C9GUNed3DdUnEBoEw2_xJA-wUsEHr-GcCZmFM65mZEf7fN2QRenbVAP7pmKJzHDc_eaOX9gMRuCu0X3Ftq8Dhx5o9YAsQ?key=pPevqAhga8cnSiLoyVH5BQ)

****


# Vercel Setup

To deploy the code from GitHub, we can use Vercel. Vercel offers a seamless deployment process for Next.js apps.

****

1. Visit <https://vercel.com/login> , login with your github account\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXc8YXpItDCog2OcU3avWUSm7V3Ls2EhRKThMitIjB3hVSSwmg9-4CgPvayJ0YdWBpNbnb3ig6rTqZ-DZlBLJUWegE10RdIHje2xNvzrw-UyyM3VVuf3zWguuuFSww6SLGIWc242itXTN99I2aPpM6VmAuku?key=pPevqAhga8cnSiLoyVH5BQ)

2. Add a new Vercel project by clicking the "Add New project" button.\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXe9RTCg6Bjz3EX6pOLrwHbCMNUVfIHN_h7Wb9xrMhx5AW-PT0SwGbZla8XCNe5xK7W3rGXGZpoXFbiN6e9Yy68ovmR43X5VHJq6cFMtpd7ReAeTdLLRs_vYEfMvg08_Rol-f_05edodJeqdmvksnhiegT4?key=pPevqAhga8cnSiLoyVH5BQ)\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfLW3h8ITXzCMLlRPE5Yt_zZ5_XuffmA08t-6sguZxE0IbsicTyVqNNZLlNWCSYk0qb6U6xwCZ-sDW1S-9rFpmBoLJWzm-y6hu7BGc7vCpRESDDsQzkOISdtJNzk87jklC-pK9rCgHgniFcAt-zBpAaTSPV?key=pPevqAhga8cnSiLoyVH5BQ)

****

Import the Forked repository from the previous step.

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXe4OWAOv7-oamg5GmWodAB9xyNOfwDCa4AmTeJgv5jGAJk97j8uQ0fInB1YtW5_4jDNWnoEnHhOpuolnRu9q16RKxaXo4y3BiIQe_LjtRZjzItNbJEafaKWcyit4IFUGFTGtQRAB-upRHwjA9aB-7lv9qua?key=pPevqAhga8cnSiLoyVH5BQ)

****


#### Setup Environment Variables

1. Click on Environment variables and add them as follows;\
   ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXf4zk7KNR27xcKnF4xK2KExkm1KLTgEyryhNw_6MTyLQ1xAlx8QJkGF71Xan3YjHiEwmyGoVoKP873-BYSWKneOT-XbMS4GvKek4sIbdoYX1QKtINKy8CKRd9vFqzHOXPwkRK1SGoTbKvDiRQxnCramdDc?key=pPevqAhga8cnSiLoyVH5BQ)\
   Here are the variables to add:

2. **NEXT\_PUBLIC\_CTF\_SPACE\_ID**   → your space ID

3. **NEXT\_PUBLIC\_CTF\_DELIVERY\_TOKEN** → Your Contentful Delivery Access Token

4. **NEXT\_PUBLIC\_CTF\_PREVIEW\_TOKEN** → Your Contentful Preview Access Token

5. **NEXT\_PUBLIC\_CTF\_ENVIRONMENT** → Your Contentful Environment ID, e.g master

6. **CONTENTFUL\_PREVIEW\_SECRET** → A secret for setting up content preview. Keep this as you would be needing it.

7. **NEXT\_PUBLIC\_SITE\_URL** → your site domain URL, if you don’t have one, put any domain for now.

8.

9. **NEXT\_PUBLIC\_GOOGLE\_TAGMGR\_ID** → if you have Google tag manager if not use this "GTM-XXX"&#x20;

****

This is what your environment variables should look like: ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfhMsHqKaTf-z6sgnWNmeY896Y47YICruV8U_nacBRJ6o8oM0-HI30PxTQDTYpG_a5IztbL7qVgCMAP6BgbHfGfvZQJaf629fDjPGHr-oXP9Q399-fX51Fsa4sH3QEa3HjLhTiTrJfISa-kOr-Ak2r6rs_I?key=pPevqAhga8cnSiLoyVH5BQ)

****


#### Click deploy to deploy your website.

****

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdUSTGFwKIP58h4ioDmSp49ygY0DFNqmV4MkdX4ZkouUSComI-yPMKUorwZNA0qRYlFNAKSVvL2pjxbJ5VdsydKrWak5E-J1gl0zjwNr3LmCH_lcZndv32LuhbM7IUNUYIwMzDvjF_p3K3C_1ulTwlo-bu0?key=pPevqAhga8cnSiLoyVH5BQ)

****


## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
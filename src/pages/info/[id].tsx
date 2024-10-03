import type { NextPage } from "next";
import { Post } from "~/types";
import { api } from "~/utils/api";

const Blog: NextPage<Props> = ({ media, relations, content }) => {};

export const getServerSideProps = async ({ query }: { query: { id: string } }) => {
    const { id } = query;

    const post = api.post.getPost.useQuery({ id: Number(id) });
};

export default Blog;

interface Props {
    data: Post;
}

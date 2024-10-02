export type User = {
    id: number;
    email: string;
    password: string;
    name?: string;
    rank: number;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
    post: Post[];
};

export type Categories = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    post: Post[];
};

export type Post = {
    id: number;
    title: string;
    content?: string;
    published: boolean;
    comments: Comment[];
    author?: User;
    authorId?: number;
    category?: Categories;
    categoryId?: number;
    createdAt: Date;
    updatedAt: Date;
};

export type Comment = {
    id: number;
    content: string;
    post: Post;
    postId: number;
    author: User;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { User } from "~/types";
import { useState } from "react";
import { useStore } from "zustand";
import { useUserData } from "~/store/store";
import { api } from "~/utils/api";
import React from "react";

export default function CreateCategory() {
    const userData = useStore(useUserData, (state: any) => state.user as User);

    const loginMutation = api.user.loginEncrypted.useMutation();
    const categoryMutation = api.category.create.useMutation();
    const getCategoryMutation = api.category.getCategoryByName.useMutation();

    const categories = api.category.getCategories.useQuery().data;

    const [categoryName, setCategoryName] = useState("");

    const handleCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const handleSubmitCategory = async (e: React.FormEvent<HTMLButtonElement>) => {
        if (categoryName.length === 0) {
            return;
        }

        e.preventDefault();

        try {
            await loginMutation.mutateAsync({
                email: userData.email,
                password: userData.password,
            });

            try {
                const exists = await getCategoryMutation.mutateAsync({
                    name: categoryName,
                });

                if (exists) {
                    return alert(`Category already exists: ${categoryName}`);
                }

                try {
                    const category = await categoryMutation.mutateAsync({
                        name: categoryName,
                    });

                    console.log(category);
                    alert(`Successfully created category: ${categoryName}`);
                } catch (error) {
                    console.error(error);

                    alert("Failed to create blog post.");
                }
            } catch (e) {
                console.error(e);
                alert("Failed to check if category exists.");
            }
        } catch (error) {
            console.error(error);

            alert("Invalid credentials.");

            window.location.href = "/";
        }
    };

    return (
        <>
            <div className="mx-auto w-full max-w-4xl p-4 py-5">
                <div className="flex flex-col rounded-lg bg-white p-2 px-8 shadow-lg">
                    <h1 className="ml-5 mt-5 text-3xl font-semibold">Create a Category</h1>
                    <div className="mx-auto mt-5 h-[1px] w-[95%] rounded-lg bg-zinc-500/30"></div>
                    <form>
                        <div className="space-y-4 p-6">
                            <div className="space-y-2">
                                <label htmlFor="categoryName" className="mb-2 block text-lg font-medium">
                                    Name
                                </label>
                                <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="categoryName" placeholder="Category title..." required value={categoryName} onChange={handleCategoryName} />
                            </div>
                            <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700" onClick={handleSubmitCategory}>
                                Submit Category
                            </button>
                        </div>
                    </form>
                    <div className="flex max-h-[50%] flex-col gap-5">
                        {(categories?.length ?? 0) > 0 ? (
                            categories?.map((category) => (
                                <div key={category.id} className="flex flex-row items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-4">
                                    <span className="text-lg font-semibold">{category.name}</span>
                                    <span className="text-sm text-gray-500">{category.id}</span>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-row items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-4">
                                <span className="text-lg font-semibold">No categories</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

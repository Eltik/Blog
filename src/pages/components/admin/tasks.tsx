import { Clock } from "lucide-react";
import React from "react";

export function Tasks() {
    return (
        <>
            <div className="mx-auto w-full max-w-4xl p-4">
                <div className="flex flex-col rounded-lg bg-white px-8 py-8 shadow-lg">
                    <div className="flex flex-col px-5">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-4xl font-semibold text-black">Last Tasks</h1>
                            <div className="mr-8 flex flex-row items-center justify-between gap-8">
                                <h2 className="text-2xl font-semibold">94</h2>
                                <h2 className="text-2xl font-semibold">23</h2>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="text-gray-500">
                                <b>117 total, </b> proceed to resolve them.
                            </span>
                            <div className="flex flex-row items-center justify-between gap-8">
                                <span className="text-gray-500">Done</span>
                                <span className="text-gray-500">Pending</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 px-5">
                        <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
                            <thead>
                                <tr className="border-r-b text-left text-xs font-semibold text-gray-500">
                                    <th className="px-5 py-3 text-left">Name</th>
                                    <th className="px-5 py-3 text-left">Admin</th>
                                    <th className="px-5 py-3 text-center">Members</th>
                                    <th className="px-5 py-3 text-center">Run Time</th>
                                    <th className="px-5 py-3 text-center">Finish Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="px-5 py-3">Onboarding</td>
                                    <td className="flex items-center space-x-3 px-5 py-3">
                                        <span>John</span>
                                    </td>
                                    <td className="px-5 py-3 text-center">10</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className="flex items-center justify-center rounded-lg bg-green-100 px-2 py-1 text-sm text-green-600">Done</span>
                                    </td>
                                    <td className="px-5 py-3 text-center text-sm">2 hours</td>
                                    <td className="px-5 py-3 text-center text-sm">7 Tue</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="px-5 py-3">Meeting with Webflow</td>
                                    <td className="flex items-center space-x-3 px-5 py-3">
                                        <span>Bob</span>
                                    </td>
                                    <td className="px-5 py-3 text-center">4</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className="flex items-center justify-center gap-3 rounded-lg bg-blue-100 px-2 py-1 text-xs text-blue-600">
                                            <Clock size={15} />
                                            In-Progress
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-center text-sm">4 days</td>
                                    <td className="px-5 py-3 text-center text-sm">19 Sun</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

interface User {
    _id: string;
    username: string;
    isFollowing: boolean;
}

export default function AllUsersPage() {
    const { token, user, isLoadingAuth } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            if (!token) return;
            const res = await axios.get("http://localhost:4000/users/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (targetId: string) => {
        console.log("followed" + targetId);
        try {
            await axios.post(
                `http://localhost:4000/users/${targetId}/follow`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnfollow = async (targetId: string) => {
        try {
            await axios.post(
                `http://localhost:4000/users/${targetId}/unfollow`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isLoadingAuth) return;
        if (token === undefined) return; // wait for token load
        if (!token) {
            router.push("/login");
        } else {
            fetchUsers();
        }
    }, [token]);

    if (loading) {
        return <div className="text-center py-12 text-gray-500">Loading users...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">All Users</h1>
                <div className="space-y-4">
                    {users.map((u) => (
                        <div
                            key={u._id}
                            className="flex items-center justify-between p-4 bg-white rounded shadow-sm"
                        >
                            <div>
                                <p className="font-medium text-gray-900">{u.username}</p>
                            </div>
                            {u._id !== user?.id && (
                                u.isFollowing ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleUnfollow(u._id)}
                                    >
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => handleFollow(u._id)}
                                    >
                                        Follow
                                    </Button>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

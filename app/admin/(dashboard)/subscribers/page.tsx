import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { DeleteSubscriberButton } from "./DeleteSubscriberButton";
import { ToggleActiveButton } from "./ToggleActiveButton";
import { ExportButton } from "./ExportButton";

async function getSubscribers() {
  await connectDB();

  const subscribers = await Subscriber.find()
    .sort({ subscribedAt: -1 })
    .lean();

  return subscribers;
}

async function getStats() {
  await connectDB();

  const [total, active, inactive] = await Promise.all([
    Subscriber.countDocuments(),
    Subscriber.countDocuments({ isActive: true }),
    Subscriber.countDocuments({ isActive: false }),
  ]);

  return { total, active, inactive };
}

export default async function SubscribersPage() {
  const [subscribers, stats] = await Promise.all([
    getSubscribers(),
    getStats(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Newsletter Subscribers</h1>
          <p className="text-zinc-400 mt-1">Manage your newsletter subscribers</p>
        </div>
        <ExportButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-400 text-sm font-medium">
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-400 text-sm font-medium">
              Active Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-400">{stats.active}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-400 text-sm font-medium">
              Unsubscribed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-zinc-500">{stats.inactive}</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers List */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">All Subscribers ({subscribers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length > 0 ? (
            <div className="space-y-3">
              {subscribers.map((subscriber) => (
                <div
                  key={String(subscriber._id)}
                  className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{subscriber.email}</p>
                      <p className="text-zinc-500 text-sm">
                        Subscribed on{" "}
                        {new Date(subscriber.subscribedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ToggleActiveButton
                      id={String(subscriber._id)}
                      isActive={subscriber.isActive}
                    />
                    <DeleteSubscriberButton
                      id={String(subscriber._id)}
                      email={subscriber.email}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-2">No subscribers yet</p>
              <p className="text-zinc-500 text-sm">
                Subscribers will appear here when they sign up for your newsletter
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

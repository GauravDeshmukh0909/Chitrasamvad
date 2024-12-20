'use client';

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [error, setError] = useState<string>("");
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const initializeStreamClient = async () => {
      try {
        if (!isLoaded || !user) return;

        const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
        console.log("API Key status:", apiKey ? "Present" : "Missing");

        if (!apiKey) {
          setError("Stream API key is missing");
          return;
        }

        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider,
        });

        setVideoClient(client);
      } catch (err) {
        console.error("Stream client initialization error:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize Stream client");
      }
    };

    initializeStreamClient();
  }, [user, isLoaded]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!videoClient) return <Loader />;

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;
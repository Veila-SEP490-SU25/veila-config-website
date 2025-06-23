"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { useLazyGetProfilesQuery } from "@/services/apis";
import { IPagination, IProfile } from "@/services/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const HeroSection = () => {
  const [getProfile, { isLoading }] = useLazyGetProfilesQuery();
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 10,
    pageIndex: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    totalItems: 0,
  });
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfile({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }).unwrap();
      const { statusCode, message } = response;
      if (statusCode === 200) {
        setProfiles(response.items);
        setPagination({
          ...pagination,
          totalItems: response.totalItems,
          totalPages: response.totalPages,
          hasNextPage: response.hasNextPage,
          hasPreviousPage: response.hasPreviousPage,
        });
      } else {
        toast.error("Failed to fetch profile", {
          description: message || "Please try again later.",
        });
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  }, [getProfile, pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="p-4 w-full h-fit">
      <Card>
        <CardTitle className="text-center">Click to a profile to manage</CardTitle>
      </Card>
    </div>
  );
};

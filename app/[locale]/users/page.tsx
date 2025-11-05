"use client";
import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import PageHead from "@/components/shared/page-head";
import UserTable from "./components/user-table";
import { DataTableSkeleton } from "@/components/shared/data-table-skeleton";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useSearchParams } from "next/navigation";
import { fetchUsers, setFilters } from "@/store/slices/user-slice";
import { UserListParams } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store";

export default function UserPage() {
  const { setLayoutType } = useLayout();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  // Set dashboard layout
  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  // Get state from Redux store
  const { users, loading, error, pagination, filters } = useAppSelector((state) => state.users);

  // Extract filter parameters from URL
  const search = searchParams.get("search") || undefined;
  const cityParam = searchParams.get("city");
  const city = cityParam || undefined;
  const countryParam = searchParams.get("country");
  const country = countryParam || undefined;
  const genderParam = searchParams.get("gender");
  const gender = (genderParam as "Male" | "Female" | "Other") || undefined;
  const isActiveParam = searchParams.get("isActive");
  const isActive = isActiveParam ? isActiveParam === "true" : undefined;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const sort = searchParams.get("sort") || "-createdAt";

  // Build filters object
  const currentFilters: UserListParams = {
    search,
    city,
    country,
    gender,
    isActive,
    page,
    limit,
    sort,
  };

  // Fetch users when filters change
  useEffect(() => {
    dispatch(setFilters(currentFilters));
    dispatch(fetchUsers(currentFilters));
  }, [dispatch, search, city, country, gender, isActive, page, limit, sort]);

  const isLoading = loading;

  // Show skeleton only on initial load
  if (isLoading && users.length === 0 && !error) {
    return (
      <DynamicLayout>
        <div className="space-y-6">
          <PageHead title="User Management | Next Starter" />
          <Breadcrumbs
            items={[
              { title: "Dashboard", link: "/dashboard" },
              { title: "Users", link: "/users" },
            ]}
          />
          <DataTableSkeleton columnCount={11} />
        </div>
      </DynamicLayout>
    );
  }
  return (
    <DynamicLayout>
      <div className="space-y-6">
        <PageHead title="User Management | Next Starter" />
        <Breadcrumbs
          items={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "Users", link: "/users" },
          ]}
        />
        <UserTable
          users={users}
          page={pagination.page}
          totalUsers={pagination.total}
          pageCount={pagination.pages}
        />
      </div>
    </DynamicLayout>
  );
}

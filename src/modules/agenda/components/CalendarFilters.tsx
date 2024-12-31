"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface CalendarFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { status?: string; timeRange?: string }) => void;
}

export function CalendarFilters({ onSearch, onFilter }: CalendarFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    timeRange: "month"
  });

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex-1 flex items-center space-x-2">
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <Button variant="outline" size="icon" onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <option value="all">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Select>

        <Select
          value={filters.timeRange}
          onValueChange={(value) => handleFilterChange("timeRange", value)}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </Select>
      </div>
    </div>
  );
}
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/investors")({
  component: () => <Navigate to="/" replace />,
});

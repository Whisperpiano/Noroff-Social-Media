import { APIError, FollowResponse, ToggleFollow } from "@/types/types";
import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function toggleFollowUser(username: string, action: ToggleFollow) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}/${action}`,
      {
        method: "PUT",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || `Something went wrong ${action}ing the user.`;
      throw new Error(errorMessage);
    }

    const { data }: { data: FollowResponse } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
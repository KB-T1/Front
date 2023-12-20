import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "../api/user";

interface postSignupBody {
  familyId: string;
  userName: string;
  profile: string;
}

import { Card } from "@/components/ui/card";
import { IProfile } from "@/services/types";

interface IProfileItemCardProps {
  profile: IProfile | null;
  onClick?: () => void;
}


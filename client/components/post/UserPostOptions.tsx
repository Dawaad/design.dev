"use client";

import { ChildNodeProps, IconType, UserPost } from "@/lib/interface";
import { copyToClipboard } from "@/lib/utils";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChevronDoubleUpIcon,
  ClipboardIcon,
  FlagIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { PinIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { usePostTools } from "../context/PostOptionToolProvider";
import { useProfileViewer } from "../context/UserProfileProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props extends ChildNodeProps {
  post: UserPost;
}

interface PostOption {
  name?: string;
  icon: IconType;
  action?: () => void;
  creatorOnly?: true | undefined;
  viewerOnly?: true | undefined;
  component?: React.ReactNode;
}

const UserPostOptions = ({ children, post }: Props) => {
  const { isOwnProfile } = useProfileViewer();
  const { setTool } = usePostTools();
  const actionOptions: PostOption[] = [
    {
      creatorOnly: true,
      icon: PencilIcon,
      component: (
        <Link className="flex" href={`/post/edit/${post.id}`}>
          <PencilIcon className="w-5 h-5 mr-2" />
          <span>Edit Post</span>
        </Link>
      ),
    },
    {
      name: "Delete Post",
      icon: TrashIcon,
      action: () => setTool("delete"),
      creatorOnly: true,
    },
    {
      name: "Archive Post",
      icon: ArrowUpTrayIcon,
      action: () => setTool("archive"),
      creatorOnly: true,
    },
    {
      icon: ViewfinderCircleIcon,
      component: (
        <Link className="flex" href={window.location.href}>
          <ViewfinderCircleIcon className="w-5 h-5 mr-2" />
          <span>View Post</span>
        </Link>
      ),
    },
    {
      name: "Report Post",
      icon: FlagIcon,
      action: () => setTool("report"),
      viewerOnly: true,
    },
    {
      name: "Share Post",
      icon: ShareIcon,
      action: () => setTool("share"),
    },
    {
      name: "Copy Link",
      icon: ClipboardIcon,
      action: () => {
        copyToClipboard(window.location.href);
        toast.success("Link Copied to Clipboard");
      },
    },
  ];

  const toolOptions: PostOption[] = [
    {
      icon: ChartBarIcon,
      component: (
        <Link className="flex" href={`/post/insights/${post.id}`}>
          <ChartBarIcon className="w-5 h-5 mr-2" />
          <span>Post Insights</span>
        </Link>
      ),
    },
    {
      name: "Boost Post",
      icon: ChevronDoubleUpIcon,
      action: () => setTool("boost"),
    },
    {
      name: "Pin Post",
      icon: PinIcon,
      action: () => setTool("pin"),
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionOptions.map((option, index) => {
            if (
              (option.creatorOnly && !isOwnProfile) ||
              (option.viewerOnly && isOwnProfile)
            ) {
              return null;
            }
            return (
              <DropdownMenuItem
                key={`post-option-${index}`}
                onClick={option.action}
              >
                {option.component ?? (
                  <>
                    <option.icon className="w-5 h-5 mr-2" />
                    <span>{option.name}</span>
                  </>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        {isOwnProfile && (
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {toolOptions.map((option, index) => (
              <DropdownMenuItem
                key={`post-option-${index}`}
                onClick={option.action}
              >
                {option.component ?? (
                  <>
                    <option.icon className="w-5 h-5 mr-2" />
                    <span>{option.name}</span>
                  </>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserPostOptions;

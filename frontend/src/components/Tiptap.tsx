"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/atom";

const Tiptap = ({ content, onChange, provider, ydoc, room }: any) => {
  const colors = [
    "#FBBC88",
    "#FAF594", // Very light yellow
    "#C3E2C2", // Soft green
    "#EAECCC", // Pale yellow
    "#FFF8C9", // Cream
    "#CBFFA9", // Light greenish-yellow
    "#E3F4F4", // Very light blue
  ];

  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const user = useRecoilValue(userState);
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  const getUser = () => user?.firstName || "Anonymous";

  const getInitialUser = () => {
    return {
      name: getUser(),
      color: getRandomColor(),
    };
  };

  const [status, setStatus] = useState("connecting");
  const [currentUser, setCurrentUser] = useState(getInitialUser);

  const editor = useEditor({
    enableContentCheck: true,
    onContentError: ({ disableCollaboration }) => {
      disableCollaboration();
    },
    onCreate: ({ editor: currentEditor }) => {
      provider.on("synced", () => {
        if (currentEditor.isEmpty) {
          currentEditor.commands.setContent(content);
        }
      });
    },
    editable: true,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Subscript,
      Superscript,
      Dropcursor,
      Image,
      Collaboration.extend().configure({
        document: ydoc,
      }),
      CollaborationCursor.extend().configure({
        provider,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Placeholder.configure({
        placeholder: "Write Your news here.......",
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // Parse URL with default protocol if needed
            const parsedUrl = new URL(
              url.includes(":") ? url : `${ctx.defaultProtocol}://${url}`
            );
            const protocol = parsedUrl.protocol.replace(":", "");

            // Allow only http/https
            return ctx.protocols.includes(protocol);
          } catch {
            return false;
          }
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col flex-grow px-4 py-3 justify-start text-black  h-full w-full gap-3 text-[18px] pt-4 outline-none leading-6",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  useEffect(() => {
    const statusHandler = (event: any) => {
      setStatus(event.status);
    };

    provider.on("status", statusHandler);

    return () => {
      provider.off("status", statusHandler);
    };
  }, [provider]);

  useEffect(() => {
    if (editor && currentUser) {
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar at the top */}
      <div className="flex-none">
        <Toolbar editor={editor} content={content} />
      </div>

      {/* Scrollable EditorContent */}
      <div className="overflow-y-auto px-4 editor-styles">
        <EditorContent editor={editor} />
        <div
          className="collab-status-group"
          data-state={status === "connected" ? "online" : "offline"}
        >
          <label>
            {status === "connected"
              ? `${editor.storage.collaborationCursor.users.length} user${
                  editor.storage.collaborationCursor.users.length === 1
                    ? ""
                    : "s"
                } online in ${room}`
              : "offline"}
          </label>
          <p
            style={
              { backgroundColor: currentUser.color } as React.CSSProperties
            }
          >
            {currentUser.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;

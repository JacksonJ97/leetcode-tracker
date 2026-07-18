"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";

function PasswordInput({
  disabled,
  placeholder = "••••••••",
  ...props
}: Omit<React.ComponentProps<typeof InputGroupInput>, "type" | "className">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const label = isPasswordVisible ? "Hide password" : "Show password";

  return (
    <InputGroup>
      <InputGroupInput
        disabled={disabled}
        placeholder={placeholder}
        type={isPasswordVisible ? "text" : "password"}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          title={label}
          aria-label={label}
          aria-pressed={isPasswordVisible}
          disabled={disabled}
          onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
        >
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { PasswordInput };

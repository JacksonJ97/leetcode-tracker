import { Button } from "@/components/ui/button";
import { GitHub } from "@/components/icons/github-icon";
import { Google } from "@/components/icons/google-icon";

function GithubSSO({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" {...props}>
      <GitHub />
      Github
    </Button>
  );
}

function GoogleSSO({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" {...props}>
      <Google />
      Google
    </Button>
  );
}

export { GithubSSO, GoogleSSO };

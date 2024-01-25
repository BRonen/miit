import { Button } from "@mui/material";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <>
      <Button>
        <Link href="/new">new</Link>
      </Button>
      <Button>
        <Link href="/normal">connect</Link>
      </Button>
    </>
  );
}
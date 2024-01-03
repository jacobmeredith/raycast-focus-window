import { Toast, showToast } from "@raycast/api";
import { focus } from "./lib/focus";

export default async function main() {
  await focus()
    .catch((error) => showToast({
      style: Toast.Style.Failure,
      title: "Failed to focus window",
      message: error.message,
    }));
}

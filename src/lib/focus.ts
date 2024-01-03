import { Toast, getPreferenceValues, showToast } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";

interface Preferences {
  application: string;
  title: string | undefined;
}

export async function focus() {
  const { application, title } = getPreferenceValues<Preferences>();
  
  if (!application || application === "") {
    return await showToast({
      style: Toast.Style.Failure,
      title: "Failed to focus window",
      message: "No application specified",
    });
  }

  if (!title || title === "") {
    return await runAppleScript(`
      on run
        tell application "System Events"
          tell application process "${application}"		
            perform action "AXRaise" of (first window)
          end tell
        end tell
      end run
    `);
  }
  
  return await runAppleScript(` 
    on run
      tell application "System Events"
          tell application process "${application}"		
            perform action "AXRaise" of (first window whose name contains "${title}")
          end tell
      end tell
    end run
  `);
}

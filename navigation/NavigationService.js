import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    console.log(`[Nav] Navigating to: ${name}`);
    navigationRef.navigate(name, params);
  } else {
    console.warn("[Nav] Navigator is not ready - cannot navigate.");
  }
}

export function reset(index, routes) {
  if (navigationRef.isReady()) {
    console.log("[Nav] Resetting to:", routes);
    navigationRef.reset({
      index,
      routes,
    });
  } else {
    console.warn("[Nav] Navigator is not ready - cannot reset.");
  }
}

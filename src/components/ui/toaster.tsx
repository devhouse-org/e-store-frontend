import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-2">
              <div className="flex flex-col gap-1">
                {title && (
                  <ToastTitle className="text-base">{title}</ToastTitle>
                )}
                {description && (
                  <ToastDescription className="text-sm text-muted-foreground">
                    {description}
                  </ToastDescription>
                )}
              </div>
              {action && (
                <div className="flex items-center gap-2">{action}</div>
              )}
            </div>
            <ToastClose className="text-foreground/50 hover:text-foreground" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

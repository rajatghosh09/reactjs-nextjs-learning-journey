import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { toast } from "sonner";
import { addNotification, clearNotification, deleteNotification } from "../Hooks/Redux-Toolkit/Slice/NotificationSlice";
import { useAppdispatch, useAppseletor } from "../Hooks/Utils/Redux";
import { RxCross2 } from "react-icons/rx";





const Notifications = () => {
  const dispatch = useAppdispatch();
  const { items, count } = useAppseletor((state) => state.notifications);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (items.length === 0) return;

    const timeout = setTimeout(() => {
      dispatch(deleteNotification(items[0].id));
    }, 10000);

    return () => clearTimeout(timeout);
  }, [items.length, dispatch, items]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white relative overflow-hidden">
      <nav className="w-full px-10 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
          Notification Generator
        </h1>

        <div className="relative">
          <button
            onClick={() => setOpen((p) => !p)}
            className="relative p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <FiBell className="text-2xl" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-red-500 rounded-full font-bold">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>


      <div className="flex items-center justify-center mt-24">
        <div className="w-[460px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">
              Trigger Notifications
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                dispatch(addNotification("success"));
                toast.success("Operation completed successfully");
              }}
              className="py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
            >
              Success
            </button>

            <button
              onClick={() => {
                dispatch(addNotification("failed"));
                toast.error("Operation failed. Please try again");
              }}
              className="py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
            >
              Failed
            </button>

            <button
              onClick={() => {
                dispatch(addNotification("warning"));
                toast.warning("Warning: Action requires attention");
              }}
              className="py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-semibold"
            >
              Warning
            </button>

            <button
              onClick={() => {
                dispatch(addNotification("info"));
                toast.info("Here’s some useful information");
              }}
              className="py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Info
            </button>
          </div>

        </div>
      </div>


      {open && (
        <div className="fixed right-6 top-24 w-[360px] bg-[#111] rounded-2xl border border-white/10 shadow-2xl">
          <div className="px-5 py-4 border-b border-white/10 flex justify-between">
            <div>
              <h3 className="font-semibold text-lg">Notifications</h3>
              <p className="text-xs text-gray-400">
                You have {items.length} unread messages
              </p>
            </div>
            <button onClick={() => setOpen(false)}><RxCross2 /></button>
          </div>

          <div className="px-5 py-2 text-right">
            <button
              onClick={() => dispatch(clearNotification())}
              className="text-sm text-red-400 hover:text-red-500"
            >
              Clear all notifications
            </button>
          </div>

          <div className="px-4 pb-4 space-y-3 max-h-[420px] overflow-y-auto">
            {items.map((n) => (
              <div
                key={n.id}
                className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <span className="w-2 h-2 mt-2 bg-green-400 rounded-full"></span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {n.type === "success"
                      ? "Action completed successfully"
                      : n.type === "warning"
                        ? "Please check this warning"
                        : n.type === "failed"
                          ? "Action failed"
                          : "For your information"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.time).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(deleteNotification(n.id))}
                  className="text-gray-400 hover:text-white"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;

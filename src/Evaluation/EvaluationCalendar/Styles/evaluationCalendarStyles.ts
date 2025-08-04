export const evaluationCalendarStyles = {
  // Main Calendar Container Styles
  calendarViewContainer:
    "space-y-6 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl transition-colors duration-300",

  // Navigation + View Toggle Styles
  navSection: "flex justify-between items-center",

  viewToggleWrapper: "flex justify-center gap-4",

  viewToggleButton: (active: boolean) =>
    `px-5 py-2 text-sm font-medium rounded-xl transition duration-200 ${
      active
        ? "bg-blue-600 text-white shadow"
        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
    }`,

  // Fallback Message for No Evaluation Styles
  noEvaluationsMessage:
    "text-center text-gray-500 dark:text-gray-400 italic mt-6",

  // Calendar Day Card Styles
  cardSection: "space-y-4",

  dayCard: "bg-white dark:bg-gray-800 shadow rounded-xl p-4 border-l-4 border-blue-500 dark:border-blue-400 transition-all",

  dayCardHeader: "text-xl font-bold text-blue-700 dark:text-blue-300 mb-2",

  dayCardEmpty: "text-sm text-gray-500 dark:text-gray-400 italic",

  dayCardList: "space-y-2",

  dayCardItem: "border border-gray-200 dark:border-gray-600 rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-700",

  dayCardItemTitle: "text-sm font-semibold text-gray-800 dark:text-gray-100",

  dayCardItemMeta: "text-xs text-gray-600 dark:text-gray-400",

  // Weekly View Grid Styles
  weeklyGrid: "grid grid-cols-1 sm:grid-cols-7 gap-4",

  weeklyDayWrapper: "flex flex-col gap-2",

  // Monthly View Grid Styles
  monthlyGrid: "grid grid-cols-1 sm:grid-cols-7 gap-4",

  monthlyDayBox:
    "min-h-[140px] border border-gray-200 dark:border-gray-700 p-2 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all",

  monthlyDateLabel: "text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",

  monthlyEvalTitle: "text-xs text-gray-700 dark:text-gray-300 truncate",
};
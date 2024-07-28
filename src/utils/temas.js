export const temas = {
    body: {
        dark: "bg-slate-900 text-slate-400",
        light: "text-slate-500 bg-white",
        system: "dark:bg-slate-900 dark:text-slate-400 text-slate-500 bg-white"
    },
    navbar:{
        h2: {
            dark: "text-slate-200",
            light: "text-slate-600",
            system: "text-slate-600 dark:text-slate-200"
        },
        button: {
            dark: "text-slate-200 hover:text-white",
            light: "text-slate-500 hover:text-slate-400",
            system: "text-slate-500 hover:text-slate-400 dark:text-slate-200 dark:hover:text-white"
        },
        border: {
            dark: "border-slate-300/10",
            light: "shadow-shape",
            system: "shadow-shape dark:border-slate-300/10"
        }
    },
    consultar_linha: {
        container: {
            dark: "border-slate-300/10 border-2",
            light: "shadow-shape bg-slate-400 border-2 border-slate-500",
            system: "shadow-shape dark:border-slate-300/10 border-2 border-slate-500"
        },
        label: {
            dark: "text-white",
            light: "text-slate-600",
            system: "text-black dark:text-slate-200"
        },
        input:{
            dark: "text-slate-200 placeholder:text-gray-400",
            light: "text-slate-500",
            system: "text-slate-500 dark:text-slate-200"
        }

    },
    menu:{
        container: {
            dark: "bg-slate-800 text-slate-400 highlight-white/5",
            light: "bg-white text-slate-900",
            system: "bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5"
        },
        select:{
            dark: "bg-slate-600 ring-0 highlight-white/5 text-slate-200",
            light: "ring-slate-900/10 text-slate-700",
            system: "ring-slate-900/10 text-slate-700 dark:bg-slate-600 dark:ring-0 dark:highlight-white/5 dark:text-slate-200"
        },
        button:{
            dark: "text-slate-400 disabled:text-gray-600",
            light: "text-gray-600 disabled:text-gray-400",
            system: "text-gray-600 disabled:text-gray-400 dark:text-slate-400 dark:disabled:text-gray-600"
        }
    },
    details: {
        dark: "bg-slate-700 text-slate-100 border-2 border-slate-300",
        light: "shadow-shape border-2 border-slate-600",
        system: "text-slate-900 dark:bg-slate-700 dark:text-slate-100 dark:border-2 dark:border-slate-300"
    },
    backgroung:{
        dark: "bg-dark",
        light: "bg-light",
        system: "dark:bg-dark bg-light"
    },
    table:{
        thead:{
            dark: "bg-slate-900",
            light: "bg-slate-600",
            system: "dark:bg-slate-900"
        },
        th:{
            dark: "border-slate-600 text-slate-200",
            light: "border-slate-900 text-slate-100",
            system: "dark:border-slate-600 dark:text-slate-200"
        },
        tbody:{
            dark: "bg-slate-800",
            light: "bg-slate-100",
            system: "dark:bg-slate-800 bg-slate-100"
        },
        tr:{
            dark: "border-slate-700 text-slate-400 ",
            light: "border-slate-700 text-slate-900 ",
            system: "dark:border-slate-700 dark:text-slate-400 "
        },
        wrap: "w-full gap-2 block",
        no_wrap: "w-full flex"
    }
}
import { createTheme } from "@mui/material";

const Theme = createTheme({
    palette: {
        mode: "light",

        background: {
            default: "#f7f2ef", 
            paper: "#ffffff",
        },

        primary: {
            main: "#D68240",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#121A1D",
            contrastText: "#ffffff",
        },

        success: {
            main: "#451197",
        },

        text: {
            primary: "#121A1D",
            secondary: "#6B6B6B",
        },

        divider: "#E5E7EB",
    },

    typography: {
        fontFamily: "'Poppins', 'Clash Display Variable', sans-serif",

        h1: {
            fontSize: "3.5rem",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#121A1D",
            letterSpacing: "-0.02em",
        },

        h2: {
            fontSize: "2.25rem",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#121A1D",
        },

        h3: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#D68240",
            fontFamily: "Clash Display Variable",
        },
        h4: {
            fontSize: "2rem",
            fontWeight: 600,
            color: "#D68240",
            fontFamily: "Clash Display Variable",
        },

        body1: {
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#6B6B6B",
        },

        body2: {
            fontSize: "0.875rem",
            color: "#9CA3AF",
        },

        button: {
            fontWeight: 600,
            letterSpacing: "0.02em",
        },
    },

    shape: {
        borderRadius: 14,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "12px 22px",
                    borderRadius: "10px",
                    textTransform: "none",
                    boxShadow: "none",
                    fontWeight: 600,
                },

                containedPrimary: {
                    backgroundColor: "#D68240",
                    color: "#ffffff",
                    boxShadow: "0px 8px 20px rgba(214,130,64,0.25)",
                    "&:hover": {
                        backgroundColor: "#c97432",
                        boxShadow: "0px 10px 25px rgba(214,130,64,0.35)",
                    },
                },

                containedSecondary: {
                    backgroundColor: "#121A1D",
                    color: "#ffffff",
                    boxShadow: "0px 8px 20px rgba(18,26,29,0.25)",
                    "&:hover": {
                        backgroundColor: "#1f2a2e",
                        boxShadow: "0px 10px 25px rgba(18,26,29,0.35)",
                    },
                },

                outlined: {
                    borderWidth: "2px",
                    "&:hover": {
                        backgroundColor: "rgba(214,130,64,0.08)",
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                },
            },
        },
    },

})

export default Theme;
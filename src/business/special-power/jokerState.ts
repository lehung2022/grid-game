interface PieceState {
  status: string;
  disabled: boolean;
}

interface State {
  rook: PieceState;
  bishop: PieceState;
  knight: PieceState;
  queen: PieceState;
}

export const initialState: State = {
  rook: { status: "", disabled: false },
  bishop: { status: "", disabled: false },
  knight: { status: "", disabled: false },
  queen: { status: "", disabled: false },
};

export type Action =
  | { type: "ROOK_SELECTED" }
  | { type: "BISHOP_SELECTED" }
  | { type: "KNIGHT_SELECTED" }
  | { type: "QUEEN_SELECTED" }
  | { type: "ROOK_UTILIZED" }
  | { type: "BISHOP_UTILIZED" }
  | { type: "KNIGHT_UTILIZED" }
  | { type: "QUEEN_UTILIZED" }
  | { type: "RESET" }
  | { type: "INCREMENT" }
  | { type: "DECREMENT" };

export const handleState = (state: State, action: Action): State => {
  let updatedJokerState: State = { ...state };

  switch (action.type) {
    case "ROOK_SELECTED":
      updatedJokerState = {
        ...state,
        rook: {
          ...state.rook,
          status: state.rook.status === "selected" ? "" : "selected",
        },
        bishop: { ...state.bishop, status: "" },
        knight: { ...state.knight, status: "" },
        queen: { ...state.queen, status: "" },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "BISHOP_SELECTED":
      updatedJokerState = {
        ...state,
        bishop: {
          ...state.bishop,
          status: state.bishop.status === "selected" ? "" : "selected",
        },
        rook: { ...state.rook, status: "" },
        knight: { ...state.knight, status: "" },
        queen: { ...state.queen, status: "" },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "KNIGHT_SELECTED":
      updatedJokerState = {
        ...state,
        knight: {
          ...state.knight,
          status: state.knight.status === "selected" ? "" : "selected",
        },
        rook: { ...state.rook, status: "" },
        bishop: { ...state.bishop, status: "" },
        queen: { ...state.queen, status: "" },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "QUEEN_SELECTED":
      updatedJokerState = {
        ...state,
        queen: {
          ...state.queen,
          status: state.queen.status === "selected" ? "" : "selected",
        },
        rook: { ...state.rook, status: "" },
        bishop: { ...state.bishop, status: "" },
        knight: { ...state.knight, status: "" },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "ROOK_UTILIZED":
      updatedJokerState = {
        ...state,
        rook: { status: "", disabled: true },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "BISHOP_UTILIZED":
      updatedJokerState = {
        ...state,
        bishop: { status: "", disabled: true },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "KNIGHT_UTILIZED":
      updatedJokerState = {
        ...state,
        knight: { status: "", disabled: true },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "QUEEN_UTILIZED":
      updatedJokerState = {
        ...state,
        queen: { status: "", disabled: true },
      };
      localStorage.setItem("jokerState", JSON.stringify(updatedJokerState));
      return updatedJokerState;

    case "RESET":
      localStorage.removeItem("jokerState");
      return initialState;

    case "INCREMENT":
      // Logic for incrementing the state (for example, incrementing a counter or some other property)
      return updatedJokerState;

    case "DECREMENT":
      // Logic for decrementing the state
      return updatedJokerState;

    default:
      return state;
  }
};

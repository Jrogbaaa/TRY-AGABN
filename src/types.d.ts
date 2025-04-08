declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useCallback: any;
  export const useMemo: any;
  export const createContext: any;
  export const useContext: any;
  export type ReactNode = any;
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type FunctionComponent<P = {}> = (props: P) => JSX.Element;
  export namespace React {
    const StrictMode: any;
    const useEffect: any;
    const useState: any;
    const useMemo: any;
    const useCallback: any;
    const useRef: any;
    type FC<P = {}> = React.FunctionComponent<P>;
    type FunctionComponent<P = {}> = (props: P) => JSX.Element;
  }
}

declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const Link: any;
  export const NavLink: any;
  export const useLocation: any;
  export const useParams: any;
  export const useNavigate: any;
}

declare module 'recharts' {
  export const LineChart: any;
  export const Line: any;
  export const BarChart: any;
  export const Bar: any;
  export const PieChart: any;
  export const Pie: any;
  export const Cell: any;
  export const XAxis: any;
  export const YAxis: any;
  export const CartesianGrid: any;
  export const Tooltip: any;
  export const Legend: any;
  export const ResponsiveContainer: any;
} 
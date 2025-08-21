export interface INavState {
  isOpen: boolean;
}

export interface IBurgerProps {
  isOpen: boolean;
  toggleNav: () => void;
}

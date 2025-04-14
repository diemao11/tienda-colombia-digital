
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { 
      name: "Muebles", 
      path: "/categoria/furniture",
      subcategories: ["Sillas", "Escritorios", "Sofás", "Estanterías"] 
    },
    { 
      name: "Electrónica", 
      path: "/categoria/electronics",
      subcategories: ["Televisores", "Audio", "Accesorios"] 
    },
    { 
      name: "Tecnología", 
      path: "/categoria/technology",
      subcategories: ["Laptops", "Smartphones", "Tablets", "Periféricos"] 
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-600">TiendaColombia</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="p-0 text-foreground">
                    {category.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link to={category.path} className="w-full">
                      Ver todo {category.name}
                    </Link>
                  </DropdownMenuItem>
                  {category.subcategories.map((subcategory) => (
                    <DropdownMenuItem key={subcategory} asChild>
                      <Link to={`${category.path}/${subcategory.toLowerCase()}`} className="w-full">
                        {subcategory}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Mi cuenta">
              <User className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Carrito" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Carrito de Compras</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <Link to="/carrito">
                    <Button className="w-full">Ver carrito</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="mb-4">
              <Input placeholder="Buscar productos..." />
            </div>
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <Link
                    to={category.path}
                    className="font-medium"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        to={`${category.path}/${subcategory.toLowerCase()}`}
                        className="block text-muted-foreground"
                        onClick={toggleMenu}
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

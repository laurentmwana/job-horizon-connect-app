'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getInitials, isMenuActive } from '@/lib/utils';
import type { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { BookOpen, LogOut, Menu, User } from 'lucide-react';
import { AppLogo } from './app-logo';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

export const Navbar = () => {
    const { auth } = usePage<SharedData>().props;

    const navItems = [
        { name: 'Accueil', href: '/' },
        { name: 'A propos', href: '/about' },
        { name: 'Activités', href: '/activities', group: '/activity' },
        { name: 'Offres', href: '/offers', group: '/offer' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                {/* Logo */}
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <AppLogo size="sm" />
                    </Link>
                    <nav className="flex items-center gap-4 text-sm lg:gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`transition-colors hover:text-foreground/100 ${
                                    isMenuActive(item.href, item.group) ? 'font-medium text-foreground' : 'text-foreground/60'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Logo */}
                <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
                    <AppLogo size="sm" />
                </Link>

                {/* Right side */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">{/* Search could go here if needed */}</div>
                    <nav className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>

                        {/* User Menu or Login */}
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-xs">{getInitials(auth.user.name)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium">{auth.user.name}</p>
                                            <p className="w-[200px] truncate text-xs text-muted-foreground">{auth.user.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Mon profil
                                        </Link>
                                    </DropdownMenuItem>
                                    {auth.guard.is_admin && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer">
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                Tableau de bord
                                            </Link>
                                        </DropdownMenuItem>
                                    )}

                                    {auth.guard.is_candidate && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/my-space" className="cursor-pointer">
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                Mon espace
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.post('/logout')}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Se déconnecter</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/login">Se connecter</Link>
                            </Button>
                        )}

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="pr-0">
                                <SheetHeader>
                                    <SheetTitle className="text-left">
                                        <Link href="/" className="flex items-center gap-4">
                                            <AppLogo size="sm" className="mr-2" />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                                    <div className="flex flex-col space-y-3">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`transition-colors hover:text-foreground/100 ${
                                                    isMenuActive(item.href, item.group) ? 'font-medium text-foreground' : 'text-foreground/60'
                                                }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
        </header>
    );
};

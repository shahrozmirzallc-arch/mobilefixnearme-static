#!/usr/bin/env python3
"""
Mobile Fix Near Me - Supabase Auto Setup
Automatically opens browser and copies SQL to clipboard
"""

import webbrowser
import pyperclip
import time
from pathlib import Path

# Colors for terminal
class Colors:
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    WHITE = '\033[97m'
    END = '\033[0m'

def main():
    print(f"\n{Colors.CYAN}🚀 Mobile Fix Near Me - Supabase Setup{Colors.END}")
    print(f"{Colors.CYAN}========================================{Colors.END}\n")
    
    # Read SQL file
    sql_file = Path("supabase-setup.sql")
    
    if not sql_file.exists():
        print(f"{Colors.YELLOW}❌ Error: supabase-setup.sql not found!{Colors.END}")
        return
    
    sql_content = sql_file.read_text(encoding='utf-8')
    
    print(f"{Colors.GREEN}✅ SQL file loaded{Colors.END}\n")
    
    # Copy to clipboard
    try:
        pyperclip.copy(sql_content)
        print(f"{Colors.GREEN}✅ SQL copied to clipboard!{Colors.END}\n")
    except:
        print(f"{Colors.YELLOW}⚠️  Could not copy to clipboard (install: pip install pyperclip){Colors.END}\n")
    
    print(f"{Colors.YELLOW}📋 Now you need to:{Colors.END}")
    print(f"{Colors.WHITE}  1. Paste in the SQL Editor (Ctrl+V){Colors.END}")
    print(f"{Colors.WHITE}  2. Click 'Run' (or press F5){Colors.END}\n")
    
    # Open browser
    print(f"{Colors.CYAN}🌐 Opening Supabase SQL Editor...{Colors.END}\n")
    webbrowser.open("https://gbwgaumyyffzlhusadjk.supabase.co/project/default/sql/new")
    
    time.sleep(1)
    print(f"{Colors.GREEN}✅ Browser opened! Paste and run!{Colors.END}\n")

if __name__ == "__main__":
    main()

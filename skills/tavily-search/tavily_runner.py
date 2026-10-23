import os
import sys
import json
import argparse
from pathlib import Path

CREDENTIALS_FILE = Path("C:/Users/Administrator/.gemini/config/credentials/tavily_credentials.json")

def get_api_key():
    if not CREDENTIALS_FILE.exists():
        raise RuntimeError(f"Tavily credentials not found at {CREDENTIALS_FILE}")
    with open(CREDENTIALS_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get("primary_api_key"), data.get("backup_api_key")

def run_search(query, search_depth="basic", max_results=5, include_answer=True, include_raw_content=False):
    from tavily import TavilyClient
    primary_key, backup_key = get_api_key()
    
    # Try primary key first, fallback to backup
    for key_name, key in [("Primary", primary_key), ("Backup", backup_key)]:
        if not key:
            continue
        try:
            client = TavilyClient(api_key=key)
            response = client.search(
                query=query,
                search_depth=search_depth,
                max_results=max_results,
                include_answer=include_answer,
                include_raw_content=include_raw_content
            )
            return response
        except Exception as e:
            sys.stderr.write(f"[{key_name} Key Failed]: {e}\n")
            if key_name == "Primary" and backup_key:
                sys.stderr.write("Attempting fallback to Backup Key...\n")
                continue
            raise

def run_extract(urls):
    from tavily import TavilyClient
    primary_key, backup_key = get_api_key()
    for key_name, key in [("Primary", primary_key), ("Backup", backup_key)]:
        if not key:
            continue
        try:
            client = TavilyClient(api_key=key)
            response = client.extract(urls=urls)
            return response
        except Exception as e:
            sys.stderr.write(f"[{key_name} Key Failed]: {e}\n")
            if key_name == "Primary" and backup_key:
                continue
            raise

def main():
    parser = argparse.ArgumentParser(description="Tavily Search & Extraction CLI for Antigravity")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Search command
    search_parser = subparsers.add_parser("search", help="Execute LLM-optimized web search")
    search_parser.add_argument("query", type=str, help="Search query string")
    search_parser.add_argument("--depth", choices=["basic", "advanced"], default="basic", help="Search depth")
    search_parser.add_argument("--max-results", type=int, default=5, help="Maximum results to return")
    search_parser.add_argument("--no-answer", action="store_true", help="Do not include AI summary answer")

    # Extract command
    extract_parser = subparsers.add_parser("extract", help="Extract clean content from URLs")
    extract_parser.add_argument("urls", nargs="+", help="One or more URLs to extract")

    args = parser.parse_args()

    if args.command == "search":
        res = run_search(
            query=args.query,
            search_depth=args.depth,
            max_results=args.max_results,
            include_answer=not args.no_answer
        )
        print(json.dumps(res, ensure_ascii=False, indent=2))
    elif args.command == "extract":
        res = run_extract(args.urls)
        print(json.dumps(res, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()

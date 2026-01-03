
import { Repository, UserProfile } from './types';

// Centralized logo URL for the brand
export const LOGO_URL = "https://api.dicebear.com/7.x/shapes/svg?seed=cr3cka&backgroundColor=0d1117";

export const MOCK_USER: UserProfile = {
  username: 'cr3cka',
  displayName: 'Cr3cka World Admin',
  bio: 'Building the future of decentralized developer tools. Obsessed with performance and AI.',
  followers: 1240,
  following: 10,
  location: 'Cyber Space',
  website: 'https://cr3cka.site',
  avatarUrl: 'https://images.unsplash.com/photo-1519085185750-7ad5551204d1?q=80&w=1000&auto=format&fit=crop'
};

export const INITIAL_REPOS: Repository[] = [
  // --- RECONNAISSANCE & OSINT (50+) ---
  { id: 'r1', name: 'subfinder', description: 'Fast passive subdomain enumeration tool.', language: 'Go', stars: 6500, forks: 1200, updatedAt: '1 day ago', isPrivate: false, owner: 'projectdiscovery' },
  { id: 'r2', name: 'assetfinder', description: 'Find domains and subdomains related to a given domain.', language: 'Go', stars: 3200, forks: 600, updatedAt: '2 weeks ago', isPrivate: false, owner: 'tomnomnom' },
  { id: 'r3', name: 'amass', description: 'In-depth Attack Surface Mapping and Asset Discovery.', language: 'Go', stars: 10800, forks: 1950, updatedAt: '3 days ago', isPrivate: false, owner: 'owasp-amass' },
  { id: 'r4', name: 'findomain', description: 'The fastest and cross-platform subdomain enumerator.', language: 'Rust', stars: 4100, forks: 800, updatedAt: '5 days ago', isPrivate: false, owner: 'findomain' },
  { id: 'r5', name: 'knock', description: 'Knockpy is a python tool designed to enumerate subdomains on a target domain through a wordlist.', language: 'Python', stars: 2500, forks: 650, updatedAt: '1 month ago', isPrivate: false, owner: 'guelfoweb' },
  { id: 'r6', name: 'massdns', description: 'A high-performance DNS stub resolver.', language: 'C', stars: 3400, forks: 700, updatedAt: '2 months ago', isPrivate: false, owner: 'blechschmidt' },
  { id: 'r7', name: 'altdns', description: 'Generates permutations, alterations and mutations of subdomains.', language: 'Python', stars: 2900, forks: 580, updatedAt: '1 year ago', isPrivate: false, owner: 'infosec-au' },
  { id: 'r8', name: 'dnsrecon', description: 'DNS Enumeration script.', language: 'Python', stars: 3100, forks: 950, updatedAt: '3 weeks ago', isPrivate: false, owner: 'darkoperator' },
  { id: 'r9', name: 'fierce', description: 'A DNS reconnaissance tool for locating non-contiguous IP space.', language: 'Python', stars: 1400, forks: 420, updatedAt: '2 years ago', isPrivate: false, owner: 'mschwager' },
  { id: 'r10', name: 'gobuster', description: 'Directory/File, DNS and VHost busting tool written in Go.', language: 'Go', stars: 9200, forks: 1500, updatedAt: '12 hours ago', isPrivate: false, owner: 'OJ' },
  { id: 'r11', name: 'dirsearch', description: 'Web path scanner.', language: 'Python', stars: 11500, forks: 2500, updatedAt: '1 day ago', isPrivate: false, owner: 'maurosoria' },
  { id: 'r12', name: 'ffuf', description: 'Fast web fuzzer written in Go.', language: 'Go', stars: 10500, forks: 1850, updatedAt: '3 days ago', isPrivate: false, owner: 'ffuf' },
  { id: 'r13', name: 'wfuzz', description: 'Web application fuzzer.', language: 'Python', stars: 5400, forks: 1250, updatedAt: '1 month ago', isPrivate: false, owner: 'xmendez' },
  { id: 'r14', name: 'httpx', description: 'Fast and multi-purpose HTTP toolkit.', language: 'Go', stars: 5800, forks: 900, updatedAt: 'Just now', isPrivate: false, owner: 'projectdiscovery' },
  { id: 'r15', name: 'httprobe', description: 'Take a list of domains and probe for working http and https servers.', language: 'Go', stars: 3900, forks: 720, updatedAt: '1 year ago', isPrivate: false, owner: 'tomnomnom' },
  { id: 'r16', name: 'meg', description: 'meg is a tool for fetching lots of URLs but still being nice to servers.', language: 'Go', stars: 1500, forks: 310, updatedAt: '2 years ago', isPrivate: false, owner: 'tomnomnom' },
  { id: 'r17', name: 'gau', description: 'getallurls fetches known URLs from OTX, Wayback Machine, and Common Crawl.', language: 'Go', stars: 4100, forks: 700, updatedAt: '4 days ago', isPrivate: false, owner: 'lc' },
  { id: 'r18', name: 'waybackurls', description: 'Fetch all the URLs that the Wayback Machine knows about for a domain.', language: 'Go', stars: 4800, forks: 880, updatedAt: '1 year ago', isPrivate: false, owner: 'tomnomnom' },
  { id: 'r19', name: 'hakrawler', description: 'Fast web crawler for endpoint discovery.', language: 'Go', stars: 3400, forks: 620, updatedAt: '2 years ago', isPrivate: false, owner: 'hakluke' },
  { id: 'r20', name: 'katana', description: 'A next-generation crawling and spidering framework.', language: 'Go', stars: 4500, forks: 800, updatedAt: '2 days ago', isPrivate: false, owner: 'projectdiscovery' },
  { id: 'r21', name: 'gospider', description: 'Fast web spider written in Go.', language: 'Go', stars: 2500, forks: 450, updatedAt: '3 months ago', isPrivate: false, owner: 'jaeles-project' },
  { id: 'r22', name: 'spiderfoot', description: 'SpiderFoot is an OSINT automation tool.', language: 'Python', stars: 10200, forks: 2100, updatedAt: '1 week ago', isPrivate: false, owner: 'smicallef' },
  { id: 'r23', name: 'recon-ng', description: 'Full-featured reconnaissance framework.', language: 'Python', stars: 9500, forks: 2300, updatedAt: '1 month ago', isPrivate: false, owner: 'lanmaster53' },
  { id: 'r24', name: 'theharvester', description: 'E-mails, subdomains and names Harvester.', language: 'Python', stars: 8500, forks: 2000, updatedAt: '5 days ago', isPrivate: false, owner: 'laramies' },
  { id: 'r25', name: 'photon', description: 'Crawler designed for OSINT.', language: 'Python', stars: 9500, forks: 1600, updatedAt: '4 months ago', isPrivate: false, owner: 's0md3v' },
  { id: 'r26', name: 'finalrecon', description: 'All-In-One Web Reconnaissance Tool.', language: 'Python', stars: 2300, forks: 600, updatedAt: '3 weeks ago', isPrivate: false, owner: 'thewhiteh4t' },
  { id: 'r27', name: 'sherlock', description: 'Hunt down social media accounts by username.', language: 'Python', stars: 46000, forks: 5800, updatedAt: '1 day ago', isPrivate: false, owner: 'sherlock-project' },
  { id: 'r28', name: 'osintgram', description: 'OSINT tool on Instagram.', language: 'Python', stars: 5200, forks: 1100, updatedAt: '6 months ago', isPrivate: false, owner: 'Datalux' },
  { id: 'r29', name: 'phoneinfoga', description: 'Information gathering & OSINT framework for phone numbers.', language: 'Go', stars: 11500, forks: 2500, updatedAt: '2 months ago', isPrivate: false, owner: 'sundowndev' },
  { id: 'r30', name: 'holehe', description: 'Check if an email is used on different websites.', language: 'Python', stars: 3800, forks: 650, updatedAt: '1 month ago', isPrivate: false, owner: 'megadose' },
  { id: 'r31', name: 'ghunt', description: 'OSINT tool to extract information from any Google Account using an email.', language: 'Python', stars: 14500, forks: 2100, updatedAt: '1 week ago', isPrivate: false, owner: 'mxrch' },
  { id: 'r32', name: 'maigret', description: 'Collect a dossier on a person by username only.', language: 'Python', stars: 3200, forks: 580, updatedAt: '2 weeks ago', isPrivate: false, owner: 'soxoj' },
  { id: 'r33', name: 'socialscan', description: 'Python library and CLI for accurately checking social media username availability.', language: 'Python', stars: 1800, forks: 350, updatedAt: '1 year ago', isPrivate: false, owner: 'ioactive' },
  { id: 'r34', name: 'eyewitness', description: 'Take screenshots of websites and provide some server header info.', language: 'Python', stars: 4800, forks: 1200, updatedAt: '3 months ago', isPrivate: false, owner: 'FortyNorthSecurity' },
  { id: 'r35', name: 'aquatone', description: 'A Tool for Domain Flyovers.', language: 'Go', stars: 6000, forks: 1150, updatedAt: '2 years ago', isPrivate: false, owner: 'michenriksen' },
  { id: 'r36', name: 'gowitness', description: 'Golang web screenshot utility.', language: 'Go', stars: 2600, forks: 510, updatedAt: '3 weeks ago', isPrivate: false, owner: 'sensepost' },
  { id: 'r37', name: 'cloud_enum', description: 'Multi-cloud OSINT tool. Enumerate public resources in AWS, Azure, and Google Cloud.', language: 'Python', stars: 2400, forks: 480, updatedAt: '4 months ago', isPrivate: false, owner: 'initstring' },
  { id: 'r38', name: 's3scanner', description: 'Scan for open S3 buckets and dump the contents.', language: 'Python', stars: 2100, forks: 450, updatedAt: '6 months ago', isPrivate: false, owner: 'sa7mon' },
  { id: 'r39', name: 'trufflehog', description: 'Find credentials and secrets in git repositories.', language: 'Go', stars: 15500, forks: 1800, updatedAt: '1 day ago', isPrivate: false, owner: 'trufflesecurity' },
  { id: 'r40', name: 'gitleaks', description: 'Scan git repos for secrets using regex and entropy.', language: 'Go', stars: 16200, forks: 1900, updatedAt: '2 days ago', isPrivate: false, owner: 'zricethezav' },
  { id: 'r41', name: 'naabu', description: 'A fast port scanner written in Go.', language: 'Go', stars: 4200, forks: 650, updatedAt: '1 week ago', isPrivate: false, owner: 'projectdiscovery' },
  { id: 'r42', name: 'rustscan', description: 'The Modern Port Scanner.', language: 'Rust', stars: 9500, forks: 1150, updatedAt: '2 weeks ago', isPrivate: false, owner: 'rustscan' },
  { id: 'r43', name: 'masscan', description: 'TCP port scanner, spews packets at 10 million packets/second.', language: 'C', stars: 22500, forks: 4900, updatedAt: '1 month ago', isPrivate: false, owner: 'robertdavidgraham' },
  { id: 'r44', name: 'zmap', description: 'The Internet-wide network scanner.', language: 'C', stars: 11500, forks: 2450, updatedAt: '2 months ago', isPrivate: false, owner: 'zmap' },
  { id: 'r45', name: 'shosubgo', description: 'Find subdomains using Shodan.', language: 'Go', stars: 800, forks: 180, updatedAt: '1 year ago', isPrivate: false, owner: 'incogbyte' },
  { id: 'r46', name: 'cloudbrute', description: 'Find a companies infrastructure, files, and apps on the top cloud providers.', language: 'Go', stars: 1200, forks: 250, updatedAt: '2 years ago', isPrivate: false, owner: '0xsha' },
  { id: 'r47', name: 'subover', description: 'A powerful subdomain takeover tool.', language: 'Go', stars: 1100, forks: 220, updatedAt: '3 years ago', isPrivate: false, owner: 'Ice3man543' },
  { id: 'r48', name: 'subzy', description: 'Subdomain takeover vulnerability checker.', language: 'Go', stars: 1500, forks: 300, updatedAt: '6 months ago', isPrivate: false, owner: 'LukaSikic' },
  { id: 'r49', name: 'crlfuzz', description: 'A fast tool to scan for CRLF injection.', language: 'Go', stars: 1400, forks: 280, updatedAt: '1 year ago', isPrivate: false, owner: 'dwisiswant0' },
  { id: 'r50', name: 'sn0int', description: 'Semi-automatic OSINT framework and package manager.', language: 'Rust', stars: 2100, forks: 350, updatedAt: '3 months ago', isPrivate: false, owner: 'kpcyrd' },
  { id: 'r51', name: 'h8mail', description: 'Password Breach Search and Email OSINT.', language: 'Python', stars: 3500, forks: 620, updatedAt: '1 year ago', isPrivate: false, owner: 'khast3ze' },
  { id: 'r52', name: 'datasploit', description: 'An OSINT Framework to perform various recon techniques.', language: 'Python', stars: 2800, forks: 850, updatedAt: '4 years ago', isPrivate: false, owner: 'datasploit' },
  { id: 'r53', name: 'maryam', description: 'Maryam: Open-source Intelligence(OSINT) Framework.', language: 'Python', stars: 1200, forks: 280, updatedAt: '6 months ago', isPrivate: false, owner: 'saeeddhqan' },
  { id: 'r54', name: 'puredns', description: 'A powerful domain resolver and subdomain brute-forcing tool.', language: 'Go', stars: 1800, forks: 350, updatedAt: '8 months ago', isPrivate: false, owner: 'd3mondev' },
  { id: 'r55', name: 'uncover', description: 'Quickly discover exposed assets using search engines.', language: 'Go', stars: 1300, forks: 180, updatedAt: '2 days ago', isPrivate: false, owner: 'projectdiscovery' },

  // --- HACKING & EXPLOITATION (Existing Tools) ---
  { id: '1', name: 'nmap', description: 'Network mapper for discovery and auditing.', language: 'C++', stars: 8200, forks: 2100, updatedAt: '2 days ago', isPrivate: false, owner: 'nmap' },
  { id: '2', name: 'metasploit-framework', description: 'Exploitation framework.', language: 'Ruby', stars: 31500, forks: 12400, updatedAt: '5 hours ago', isPrivate: false, owner: 'rapid7' },
  { id: '3', name: 'wireshark', description: 'Network protocol analyzer.', language: 'C', stars: 2500, forks: 800, updatedAt: '1 month ago', isPrivate: false, owner: 'wireshark' },
  { id: '4', name: 'sqlmap', description: 'Automatic SQL injection tool.', language: 'Python', stars: 29000, forks: 5200, updatedAt: 'Just now', isPrivate: false, owner: 'sqlmapproject' },
  { id: '12', name: 'nuclei', description: 'Template-based vulnerability scanner.', language: 'Go', stars: 18000, forks: 2500, updatedAt: 'Just now', isPrivate: false, owner: 'projectdiscovery' },
  { id: '15', name: 'mimikatz', description: 'Windows security tool (credentials dumping).', language: 'C', stars: 39000, forks: 8800, updatedAt: '2 weeks ago', isPrivate: false, owner: 'gentilkiwi' },
  { id: '31', name: 'hashcat', description: 'Advanced password recovery utility.', language: 'C', stars: 18400, forks: 3100, updatedAt: '1 day ago', isPrivate: false, owner: 'hashcat' },
  { id: '32', name: 'beef', description: 'Browser Exploitation Framework.', language: 'Ruby', stars: 8500, forks: 2200, updatedAt: '1 week ago', isPrivate: false, owner: 'beefproject' },
  { id: '72', name: 'dalfox', description: 'XSS scanner and parameter analysis.', language: 'Go', stars: 3500, forks: 650, updatedAt: '4 days ago', isPrivate: false, owner: 'hahwul' },
  { id: '74', name: 'feroxbuster', description: 'Recursive content discovery tool.', language: 'Rust', stars: 5400, forks: 750, updatedAt: '1 week ago', isPrivate: false, owner: 'epi052' },
  
  // Adding more to fill up to 150+
  { id: 'x1', name: 'impacket', description: 'Network protocol collection.', language: 'Python', stars: 15400, forks: 3900, updatedAt: '1 day ago', isPrivate: false, owner: 'fortra' },
  { id: 'x2', name: 'bloodhound', description: 'AD relationship graphing tool.', language: 'TypeScript', stars: 12200, forks: 2300, updatedAt: '5 days ago', isPrivate: false, owner: 'BloodHoundAD' },
  { id: 'x3', name: 'evil-winrm', description: 'WinRM shell for pentesting.', language: 'Ruby', stars: 4000, forks: 880, updatedAt: '3 days ago', isPrivate: false, owner: 'Hackplayers' },
  { id: 'x4', name: 'responder', description: 'LLMNR/NBT-NS/mDNS poisoner.', language: 'Python', stars: 6500, forks: 1750, updatedAt: '1 week ago', isPrivate: false, owner: 'lgandx' },
  { id: 'x5', name: 'burpsuite-extension-list', description: 'Curated list of Burp Suite extensions.', language: 'Java', stars: 2100, forks: 450, updatedAt: '1 month ago', isPrivate: false, owner: 'cr3cka' },
  { id: 'x6', name: 'ghauri', description: 'Advanced SQL injection automation.', language: 'Python', stars: 1900, forks: 430, updatedAt: '2 days ago', isPrivate: false, owner: 'nasir-furqan' },
  { id: 'x7', name: 'commix', description: 'Command injection exploitation tool.', language: 'Python', stars: 4300, forks: 1150, updatedAt: '2 weeks ago', isPrivate: false, owner: 'commixproject' },
  { id: 'x8', name: 'seclists', description: 'Wordlists for security assessments.', language: 'Shell', stars: 53000, forks: 15200, updatedAt: '1 day ago', isPrivate: false, owner: 'danielmiessler' },
  { id: 'x9', name: 'payloadsallthethings', description: 'Payloads and techniques for Web App Security.', language: 'Markdown', stars: 55000, forks: 13500, updatedAt: 'Just now', isPrivate: false, owner: 'swisskyrepo' },
  { id: 'x10', name: 'oscp-cheat-sheet', description: 'Collection of cheat sheets for OSCP.', language: 'Shell', stars: 3200, forks: 950, updatedAt: '1 month ago', isPrivate: false, owner: 'cr3cka' }
  // ... (Truncated for space, assume 150 entries in actual logic)
];

// Fill with more mock data to reach 150+ if needed
const toolsToFill = Array.from({ length: 95 }).map((_, i) => ({
  id: `fill-${i}`,
  name: `tool-${Math.random().toString(36).substring(7)}`,
  description: 'Automated cybersecurity tool for various penetration testing tasks.',
  language: ['Python', 'Go', 'Rust', 'C', 'C++'][Math.floor(Math.random() * 5)],
  stars: Math.floor(Math.random() * 10000),
  forks: Math.floor(Math.random() * 2000),
  updatedAt: `${Math.floor(Math.random() * 30)} days ago`,
  isPrivate: Math.random() > 0.9,
  owner: 'cr3cka-community'
}));

INITIAL_REPOS.push(...toolsToFill);

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Go: '#00ADD8',
  C: '#555555',
  'C++': '#f34b7d',
  Ruby: '#701516',
  Java: '#b07219',
  Perl: '#0298c3',
  Shell: '#89e051',
  PHP: '#4F5D95',
  Rust: '#dea584',
  Markdown: '#083fa1',
  Default: '#8b949e'
};

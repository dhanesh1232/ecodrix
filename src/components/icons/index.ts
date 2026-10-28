// Copied from ECOD/saas/src/components/icons (keep the three files in step with the SaaS copy).
// One component per icon name the site imports (the lucide-react names), each drawing that real
// Lucide icon from data copied into glyphs.ts (Lucide v0.577.0, ISC licence in LICENSE-lucide.txt).
// No icon package at runtime. New code: <Icon name="…" /> with a Lucide icon name or a brand
// name (whatsapp, instagram, googlecalendar, razorpay…): one component for every icon.

import { createIcon, createLetterIcon, SpinnerArc } from "./Icon";

export {
  type BrandIconProps,
  createIcon,
  createLetterIcon,
  GLYPH_CATEGORIES,
  type GlyphIconProps,
  type GlyphName,
  ICON_NAMES,
  Icon,
  type IconBaseProps,
  IconChip,
  type IconChipTone,
  type IconComponent,
  type IconName,
  type MixedIconProps,
  type IconProps,
  type IconVariant,
  isBrandName,
  opticalStroke,
  SpinnerArc,
} from "./Icon";
export type { BrandGradient, BrandMark, BrandName } from "./glyphs";


export const Activity = createIcon("activity");
export const AlertCircle = createIcon("circle-alert");
export const AlertTriangle = createIcon("triangle-alert");
export const AlignLeft = createIcon("text-align-start");
export const Archive = createIcon("archive");
export const ArchiveRestore = createIcon("archive-restore");
export const ArrowDown = createIcon("arrow-down");
export const ArrowLeft = createIcon("arrow-left");
export const ArrowRight = createIcon("arrow-right");
export const ArrowRightLeft = createIcon("arrow-right-left");
export const ArrowUp = createIcon("arrow-up");
export const ArrowUpRight = createIcon("arrow-up-right");
export const Ban = createIcon("ban");
export const BarChart3 = createIcon("chart-column");
export const Bell = createIcon("bell");
export const BellRing = createIcon("bell-ring");
export const Blocks = createIcon("blocks");
export const Bold = createIcon("bold");
export const BookOpen = createIcon("book-open");
export const Bookmark = createIcon("bookmark");
export const Bot = createIcon("bot");
export const Boxes = createIcon("boxes");
export const Braces = createIcon("braces");
export const Brain = createIcon("brain");
export const Building2 = createIcon("building-2");
export const Cable = createIcon("cable");
export const Calendar = createIcon("calendar");
export const CalendarCheck = createIcon("calendar-check");
export const CalendarClock = createIcon("calendar-clock");
export const CalendarDays = createIcon("calendar-days");
export const CalendarIcon = createIcon("calendar");
export const CalendarPlus = createIcon("calendar-plus");
export const CalendarX = createIcon("calendar-x");
export const Check = createIcon("check");
export const CheckCheck = createIcon("check-check");
export const CheckCircle = createIcon("circle-check-big");
export const CheckCircle2 = createIcon("circle-check");
export const CheckIcon = createIcon("check");
export const ChevronDown = createIcon("chevron-down");
export const ChevronDownIcon = createIcon("chevron-down");
export const ChevronLeft = createIcon("chevron-left");
export const ChevronLeftIcon = createIcon("chevron-left");
export const ChevronRight = createIcon("chevron-right");
export const ChevronRightIcon = createIcon("chevron-right");
export const ChevronUp = createIcon("chevron-up");
export const ChevronUpIcon = createIcon("chevron-up");
export const ChevronsUpDown = createIcon("chevrons-up-down");
export const Circle = createIcon("circle");
export const CircleAlert = createIcon("circle-alert");
export const ClipboardCheck = createIcon("clipboard-check");
export const ClipboardCopy = createIcon("clipboard-copy");
export const ClipboardList = createIcon("clipboard-list");
export const Clock = createIcon("clock");
export const Cloud = createIcon("cloud");
export const Code2 = createIcon("code-xml");
export const Coins = createIcon("coins");
export const Columns3 = createIcon("columns-3");
export const Compass = createIcon("compass");
export const Copy = createIcon("copy");
export const CornerDownLeft = createIcon("corner-down-left");
export const Cpu = createIcon("cpu");
export const CreditCard = createIcon("credit-card");
export const Crosshair = createIcon("crosshair");
export const Database = createIcon("database");
export const Download = createIcon("download");
export const Dumbbell = createIcon("dumbbell");
export const Edit2 = createIcon("pen");
export const Edit3 = createIcon("pen-line");
export const ExternalLink = createIcon("external-link");
export const Eye = createIcon("eye");
export const EyeOff = createIcon("eye-off");
export const FilePen = createIcon("file-pen");
export const FilePlus2 = createIcon("file-plus-corner");
export const FileQuestion = createIcon("file-question-mark");
export const FileSignature = createIcon("file-pen-line");
export const FileStack = createIcon("file-stack");
export const FileText = createIcon("file-text");
export const FileUp = createIcon("file-up");
export const FileX = createIcon("file-x");
export const Filter = createIcon("funnel");
export const Flame = createIcon("flame");
export const FolderKanban = createIcon("folder-kanban");
export const FolderOpen = createIcon("folder-open");
export const FolderPlus = createIcon("folder-plus");
export const FolderTree = createIcon("folder-tree");
export const Gauge = createIcon("gauge");
export const Gift = createIcon("gift");
export const GitBranch = createIcon("git-branch");
export const GitMerge = createIcon("git-merge");
export const Globe = createIcon("globe");
export const GraduationCap = createIcon("graduation-cap");
export const Grid3X3 = createIcon("grid-3x3");
export const GripVertical = createIcon("grip-vertical");
export const Hand = createIcon("hand");
export const HardDrive = createIcon("hard-drive");
export const Hash = createIcon("hash");
export const Heading = createIcon("heading");
export const Heart = createIcon("heart");
export const History = createIcon("history");
export const House = createIcon("house");
const ImageGlyph = createIcon("image");
export const ImageIcon = createIcon("image");
export const ImageOff = createIcon("image-off");
export const ImagePlus = createIcon("image-plus");
export const Inbox = createIcon("inbox");
export const IndianRupee = createIcon("indian-rupee");
const InfinityGlyph = createLetterIcon("∞", { fontSize: 24 });
export const Info = createIcon("info");
export const Italic = createIcon("italic");
export const Kanban = createIcon("kanban");
export const KanbanSquare = createIcon("square-kanban");
export const KeyRound = createIcon("key-round");
export const Keyboard = createIcon("keyboard");
export const Layers = createIcon("layers");
export const Layout = createIcon("panels-top-left");
export const LayoutDashboard = createIcon("layout-dashboard");
export const LayoutGrid = createIcon("layout-grid");
export const LayoutTemplate = createIcon("layout-template");
export const LifeBuoy = createIcon("life-buoy");
export const Lightbulb = createIcon("lightbulb");
export const LineChart = createIcon("chart-line");
export const Link2 = createIcon("link-2");
export const Link2Off = createIcon("link-2-off");
export const LinkIcon = createIcon("link");
export const List = createIcon("list");
export const ListChecks = createIcon("list-checks");
export const ListTodo = createIcon("list-todo");
export const Loader2 = SpinnerArc;
export const Loader2Icon = SpinnerArc;
export const Lock = createIcon("lock");
export const LogIn = createIcon("log-in");
export const LogOut = createIcon("log-out");
export const Mail = createIcon("mail");
export const MailCheck = createIcon("mail-check");
export const MailOpen = createIcon("mail-open");
export const MailX = createIcon("mail-x");
export const MapPin = createIcon("map-pin");
export const MapPinned = createIcon("map-pinned");
export const Maximize = createIcon("maximize");
export const Maximize2 = createIcon("maximize-2");
export const Megaphone = createIcon("megaphone");
export const Merge = createIcon("merge");
export const MessageCircle = createIcon("message-circle");
export const MessageSquare = createIcon("message-square");
export const MessageSquareHeart = createIcon("message-square-heart");
export const MessageSquarePlus = createIcon("message-square-plus");
export const MessageSquareReply = createIcon("message-square-reply");
export const MessagesSquare = createIcon("messages-square");
export const Minimize2 = createIcon("minimize-2");
export const Minus = createIcon("minus");
export const MinusIcon = createIcon("minus");
export const Monitor = createIcon("monitor");
export const Moon = createIcon("moon");
export const MoreHorizontal = createIcon("ellipsis");
export const MoreVertical = createIcon("ellipsis-vertical");
export const MousePointerClick = createIcon("mouse-pointer-click");
export const Package = createIcon("package");
export const Palette = createIcon("palette");
export const PanelBottom = createIcon("panel-bottom");
export const PanelLeftIcon = createIcon("panel-left");
export const PanelLeftOpen = createIcon("panel-left-open");
export const PanelRightOpen = createIcon("panel-right-open");
export const Paperclip = createIcon("paperclip");
export const Pause = createIcon("pause");
export const PauseCircle = createIcon("circle-pause");
export const PenLine = createIcon("pen-line");
export const PenTool = createIcon("pen-tool");
export const Pencil = createIcon("pencil");
export const PencilLine = createIcon("pencil-line");
export const Percent = createIcon("percent");
export const Phone = createIcon("phone");
export const PhoneCall = createIcon("phone-call");
export const Pin = createIcon("pin");
export const PinOff = createIcon("pin-off");
export const Play = createIcon("play");
export const PlayCircle = createIcon("circle-play");
export const Plug = createIcon("plug");
export const PlugZap = createIcon("plug-zap");
export const Plus = createIcon("plus");
export const Power = createIcon("power");
export const PowerOff = createIcon("power-off");
export const Radar = createIcon("radar");
export const Radio = createIcon("radio");
export const Receipt = createIcon("receipt");
export const ReceiptText = createIcon("receipt-text");
export const Redo2 = createIcon("redo-2");
export const RefreshCw = createIcon("refresh-cw");
export const Repeat = createIcon("repeat");
export const Reply = createIcon("reply");
export const Rocket = createIcon("rocket");
export const RotateCcw = createIcon("rotate-ccw");
export const RotateCw = createIcon("rotate-cw");
export const Rows3 = createIcon("rows-3");
export const Save = createIcon("save");
export const Scale = createIcon("scale");
export const ScanSearch = createIcon("scan-search");
export const ScrollText = createIcon("scroll-text");
export const Search = createIcon("search");
export const SearchIcon = createIcon("search");
export const SearchX = createIcon("search-x");
export const Send = createIcon("send");
export const SendHorizontal = createIcon("send-horizontal");
export const Server = createIcon("server");
export const Settings = createIcon("settings");
export const Settings2 = createIcon("settings-2");
export const Shapes = createIcon("shapes");
export const Share2 = createIcon("share-2");
export const Shield = createIcon("shield");
export const ShieldAlert = createIcon("shield-alert");
export const ShieldCheck = createIcon("shield-check");
export const ShieldOff = createIcon("shield-off");
export const ShoppingBag = createIcon("shopping-bag");
export const ShoppingCart = createIcon("shopping-cart");
export const Shuffle = createIcon("shuffle");
export const SkipForward = createIcon("skip-forward");
export const Sliders = createIcon("sliders-vertical");
export const SlidersHorizontal = createIcon("sliders-horizontal");
export const Smartphone = createIcon("smartphone");
export const Smile = createIcon("smile");
export const Snowflake = createIcon("snowflake");
export const Sparkles = createIcon("sparkles");
export const Split = createIcon("split");
export const SquareStack = createIcon("square-stack");
export const Star = createIcon("star");
export const Stethoscope = createIcon("stethoscope");
export const StickyNote = createIcon("sticky-note");
export const Sun = createIcon("sun");
export const Swords = createIcon("swords");
export const Target = createIcon("target");
export const Terminal = createIcon("terminal");
export const ThumbsDown = createIcon("thumbs-down");
export const Timer = createIcon("timer");
export const Trash2 = createIcon("trash-2");
export const TrendingDown = createIcon("trending-down");
export const TrendingUp = createIcon("trending-up");
export const TriangleAlert = createIcon("triangle-alert");
export const Trophy = createIcon("trophy");
export const Type = createIcon("type");
export const Underline = createLetterIcon("U", {
  fontSize: 17,
  underline: true,
});
export const Undo2 = createIcon("undo-2");
export const Upload = createIcon("upload");
export const UploadCloud = createIcon("cloud-upload");
export const User = createIcon("user");
export const UserCheck = createIcon("user-check");
export const UserPlus = createIcon("user-plus");
export const UserRound = createIcon("user-round");
export const UserRoundCheck = createIcon("user-round-check");
export const Users = createIcon("users");
export const UtensilsCrossed = createIcon("utensils-crossed");
export const Variable = createIcon("variable");
export const Video = createIcon("video");
export const Wallet = createIcon("wallet");
export const Wand2 = createIcon("wand-sparkles");
export const Webhook = createIcon("webhook");
export const WifiOff = createIcon("wifi-off");
export const Workflow = createIcon("workflow");
export const Wrench = createIcon("wrench");
export const X = createIcon("x");
export const XCircle = createIcon("circle-x");
export const XIcon = createIcon("x");
export const Zap = createIcon("zap");

// Names that would shadow JS globals inside this module.
export { ImageGlyph as Image, InfinityGlyph as Infinity };

// Site additions (names the marketing site used that the SaaS map doesn't have).
export const AlertOctagon = createIcon("octagon-alert");
export const ArrowUpDown = createIcon("arrow-up-down");
export const Baby = createIcon("baby");
export const BadgeIndianRupee = createIcon("badge-indian-rupee");
export const BadgePercent = createIcon("badge-percent");
export const BellOff = createIcon("bell-off");
export const Bug = createIcon("bug");
export const Cookie = createIcon("cookie");
export const FileCheck = createIcon("file-check");
export const Gavel = createIcon("gavel");
export const HeartPulse = createIcon("heart-pulse");
export const Menu = createIcon("menu");
export const MessageSquareWarning = createIcon("message-square-warning");
export const MinusCircle = createIcon("circle-minus");
export const Network = createIcon("network");
export const Tag = createIcon("tag");
export const ToggleRight = createIcon("toggle-right");
export const UserRoundPlus = createIcon("user-round-plus");
export const UserX = createIcon("user-x");

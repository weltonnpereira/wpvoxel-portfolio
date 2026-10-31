import React, { useState, useEffect } from 'react';
import { copyToClipboard } from './utils/clipboard.ts';

// Public Google asset URLs preserved from specification
const ASSETS = {
  headerLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAilyDFpN-0sUCxD0V1Pn71r3mt0cjAJNEC_CbSGwuFktH1aX2nSw5ZqMTLcZMME_QvxqRtcsFUDP4ddL9paJoDtI61xbfGRsBwMD7sQqBJFyutuG83kUg3CTZKiY6t4Gjry-polGnsmEqf4hpM-OKe1DNb3J5ALSd9VIwPTPaVD1Ar1t-Bg9u1_5pasmVlCK49bMR7frVJf5Pt2MaXHjbf_GsPf7SJY1uC-SHvDg10ytXA7LcS2HJRx3iUj87igYLQDNjhytOqllKlFQ',
  heroWallpaper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYC-6zURme4UAbaZNPcsY2cVNeJvaHBUESG9tQxzpo50eJ0KpEVZHrC_j9fKL9QEE-geO4EGnKL1uer0ZUs6XriuXBoGvX51R7fPbND5dSOHfwjyYKv0HIg4HLayYGLmAJGL-l4la8r8XbozTysgeVihSAGhE7jMgKdhWq8AG8NjwMc7VE-bbntaXeVykLPkEaV6i3SzyNE4r_gm5nvWKv0TjjYT4mKsJFCiRDcLo',
  skinRig: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1nAsHFYk1-_poFEOxFw7BrALS65y0ekycp5IQKdXNwChAp8m-BwCKhZrADPzxS2FsxmdLNKozUOxDvVQgvZueKhysvdjM_mjV1RWHiRQUK_MsGaeRN6ht4Fb30dRJa0Rp3njADgmIbdM-f9-frjLyT-XhT5PuVrbWOLgzT3QUrgn-wl4zTNfPJpX3QTkvUE7FSc1a05Kw470R6Y7P5GAgS3fkBJ3C2i-KfcenJqswUVDgYkycyl7tteXdpXY7_yLgAD0ehpaKbq9FNQ',
  starrySky: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnvaeky7kOHKFCodlKZwTxo2NbElBoSdr9wybtcRqg3QypbyxvJX3lxiIXht-jrgVUosOoZRFwL_fkUBnOcK87kNGaMvoq053_TiabD7pnVQ-rSp5qRTSSBfLklC-HSZe1ZNayK7Ii5_DS5jPZCn_VDVOS22_ycoFMdT4pbHhH3zL9IstGu6Ix6q-cWwXMUVmj9I8f37G4NFUIKb40XKaZ6087EFcF-XvLTvkeqJpf4aCLN_AY0oO4',
  bat: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2MU9QKaAqAxJ0qXfkIM8LwsLo9_yuTJOKsYhxZLFaEFVXAAX8TNpNVJ68dGsB95U_wtkdy4FN2_fGOM5Xoux32mlCzXCYJ55jkfNX75oK313SqEu5BGBBA4j9gwWlkh__rfnyRBWIu5SylnAR7ho94ayl_896_rYhy-iVf4CRtfJNAxEC1eGhJL8lm_0v-wXGJa13-1y2IgwEyxNhTebILz6UIT6oWPcLOUGzWYPgnuP5-4cbZBSU',
  aboutLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuKIg0nRwWtK6v3ylLLcSc2DLzqJSyyEFclw8NFVf9zx3u4BMIEkY2pJXh5qHEduB68rbUP-np8X5x0NF0WlkVtkU0Y0QNXkGHUmjtE4O2LJjoIJwWYn0mds7R47iYplYMbJ7UwLbjIgT34Lo5zIWLKDbGPjd01gxkbD4j7GnjzFrxlmB4MsxIQWRCSSSlFEAsDpEkx_6g1cV0bL9sg7V2lhrD3UUftAA2bSM0OrAw6M_RcXFYuExxxNPtkd14ZNcGrH7Q2hrqMU13FA',
  allay: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5HbwtZDFnrHveB3qQPMApPEi_TqmqQ5ij3vIb9a06bneRFZROfrh8B5es3ljAYeqidYc25faoZtsVtz6ojIqQ1b_pMZ_t4S09hyovJyeZeMDJazNh7vvpWO8erIbI6aRe-14bX2r6Bko6KB19RRBj3uVGYwjRbcQEKQ-7ZKW-EqXDmxw--NZ8RoPwoHtvJWtaGjOW9TQp0K44YfEnnDBkIRa07ylmeT2SzliBW0nuMIM6pRc9Y94u',
  footerLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ_3lGUp-2wpoPTGgwwnz1pQobNfJdG3ENDTJYHaS_zAGzAvuSrLFLkAaSKIU1MEFctJa15xiTKomePuYE_GUKYnzMeLIRBeOomG3hmQ0OoAaWIINjAA_wUGX2x4JyMKd7RwT2lIY7z2FtivFw1FzVY1gI_ih6d2vCwz-v3N1Zq3ohdnEZ4qmt2ej_9sGTIz7LfSeEPFpk9mUkHCc8cbxqpZbIJZMD0UhzmcGiI1lVYUXHRXApmza4Io0_ZAXESz-rQooYdZ_340UFQA',
};

// Background cinematic video trailer for featured Minecraft plugins
const TRAILER_VIDEO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/1/19/The_Wild_Update_-_Minecraft_Launch_Trailer.webm';


interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  status: string;
  platform: string;
  description: string;
  highlights: string[];
  tags: string[];
  accentColor: string;
  codeSnippet: string;
  youtubeEmbedId?: string;
  youtubeUrl?: string;
  isOpenSource?: boolean;
  githubUrl?: string;
  spigotUrl?: string;
  hangarUrl?: string;
}

const PROJECTS: ProjectDetails[] = [
  {
    id: 'parkour',
    title: 'Parkour + Steam to Earn',
    category: 'Game Modes',
    status: 'Live in Production',
    platform: 'Paper 1.20+',
    accentColor: '#00b954',
    youtubeEmbedId: 'mC64F_o7N7A',
    youtubeUrl: 'https://www.youtube.com/watch?v=mC64F_o7N7A',
    isOpenSource: true,
    githubUrl: 'https://github.com/wpvoxel/parkour-steam-integration',
    hangarUrl: 'https://hangar.papermc.io/wpvoxel/ParkourSteam',
    description:
      'Cross-platform integration connecting in-game parkour time-trials and checkpoint mechanics with Steam API verification and automated wallet rewards.',
    highlights: [
      'Movement physics packet validation & anti-exploit verification',
      'Asynchronous Steam OpenID & Web API token exchange callbacks',
      'Sub-millisecond Redis checkpoint leaderboard sync & caching',
      'Tick-level player velocity rollback on invalid block interactions',
    ],
    tags: ['Paper API', 'Steamworks', 'Java 21', 'Redis', 'PacketEvents'],
    codeSnippet: `@EventHandler(priority = EventPriority.HIGHEST, ignoreCancelled = true)
public void onPlayerCheckpoint(PlayerMoveEvent event) {
    Player player = event.getPlayer();
    ParkourSession session = sessionManager.getActive(player.getUniqueId());
    if (session == null || !session.isInRun()) return;

    // Asynchronous non-blocking Redis state publish
    CompletableFuture.runAsync(() -> {
        session.recordCheckpoint(event.getTo());
        redisSync.publishLeaderboardDelta(player.getUniqueId(), session.getElapsedNanos());
    }, asyncPool);
}`,
  },
  {
    id: 'enchants',
    title: 'Custom Enchants & Arcane Runes',
    category: 'Mechanics',
    status: 'Modular Engine',
    platform: 'Purpur / Spigot',
    accentColor: '#8A3FFC',
    youtubeEmbedId: '7Q3Z0R1F4fU',
    youtubeUrl: 'https://www.youtube.com/watch?v=7Q3Z0R1F4fU',
    isOpenSource: false,
    spigotUrl: 'https://www.spigotmc.org/resources/custom-enchants-arcane-runes.108420/',
    description:
      'Modular combat and utility enchantment engine supporting over 45+ trigger conditions, persistent PDC NBT tags, and dynamic visual shader packets.',
    highlights: [
      'High-performance event-driven activation pipeline with zero lag spikes',
      'Anvil, Grindstone, and Runetable custom interactive GUIs',
      'Adventure MiniMessage dynamic lore & gradient color rendering',
      'PDC (PersistentDataContainer) byte storage for cross-restart preservation',
    ],
    tags: ['Purpur API', 'ProtocolLib', 'MiniMessage', 'Custom NBT', 'Adventure'],
    codeSnippet: `public final class SoulReaperEnchant extends AbstractCustomEnchant {
    @Override
    public void onCombatStrike(EntityDamageByEntityEvent event, ItemStack weapon, int level) {
        if (!(event.getEntity() instanceof LivingEntity victim)) return;
        
        // Spawn particle matrix & apply wither decay
        victim.addPotionEffect(new PotionEffect(PotionEffectType.WITHER, 60, level));
        PacketFactory.broadcastArcaneRuneBurst(victim.getLocation());
    }
}`,
  },
  {
    id: 'minigames',
    title: 'Competitive Minigame Systems',
    category: 'Folia/Async',
    status: 'Prototype / Testing',
    platform: 'Folia Ready',
    accentColor: '#dab1ff',
    youtubeEmbedId: 'e8x8c1gP69M',
    youtubeUrl: 'https://www.youtube.com/watch?v=e8x8c1gP69M',
    isOpenSource: true,
    githubUrl: 'https://github.com/wpvoxel/folia-minigames-engine',
    spigotUrl: 'https://www.spigotmc.org/resources/folia-minigames-engine.112340/',
    hangarUrl: 'https://hangar.papermc.io/wpvoxel/FoliaMinigames',
    description:
      'Distributed arena orchestrator with dynamic world-border shrinking, automated spectator ghost cameras, and skill-based lobby matchmaking.',
    highlights: [
      'SlimeWorldManager instant arena rollbacks in <12ms without disk stalls',
      'Concurrent region-threaded tick architecture engineered for Folia',
      'FastBoard scoreboards with zero flicker & negligible CPU overhead',
      'Dynamic matchmaker balancing ELO ratings across distributed instances',
    ],
    tags: ['Folia', 'SlimeWorld', 'MongoDB', 'Netty', 'FastBoard'],
    codeSnippet: `// Folia Region Scheduler execution
public void initiateSuddenDeath(ArenaRegion region) {
    Bukkit.getRegionScheduler().execute(plugin, region.getCenter(), () -> {
        region.getWorldBorder().setSize(16.0, 45);
        region.broadcastMiniMessage("<red><bold>[SUDDEN DEATH]</bold> Arena is collapsing!");
        region.playGlobalSound("entity.ender_dragon.growl", 1.0f, 0.8f);
    });
}`,
  },
];

function ProjectVideoWithSkeleton({
  title,
  embedId,
  onOpenModal,
}: {
  title: string;
  embedId?: string;
  onOpenModal?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [embedId]);

  return (
    <div
      onClick={onOpenModal}
      className={`w-full aspect-video bg-[#030e20] border border-[#1e2a3d] mb-4 overflow-hidden relative shadow-inner group/video select-none ${
        onOpenModal ? 'cursor-pointer hover:border-[#67E8F9]/60' : ''
      }`}
    >
      {/* Expand Theater Overlay Hint Button */}
      {onOpenModal && embedId && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-[#030e20]/90 hover:bg-[#0B1F38] border border-[#1e2a3d] hover:border-[#67E8F9] text-[#67E8F9] text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm group-hover/video:scale-105"
          title="Expand demo video into on-site theater modal"
          aria-label="Expand demo video in theater modal"
        >
          <span className="material-symbols-outlined text-[15px]">open_in_full</span>
          <span>Expand</span>
        </button>
      )}

      {/* Subtle Loading Skeleton (Prevents CLS & Layout Shifts while Mounting/Buffering) */}
      <div
        aria-hidden={isLoaded}
        className={`absolute inset-0 z-10 flex flex-col justify-between p-3.5 bg-gradient-to-br from-[#041022] via-[#08172c] to-[#030e20] overflow-hidden transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Subtle Horizontal Shimmer Light Beam */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#67E8F9]/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1e2a3d] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#67E8F9]/70 uppercase animate-pulse">
              DEMO_STREAM // BUFFERING
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[9px] px-1.5 py-0.5 bg-[#0b1f38] border border-[#1e2a3d] text-[#67E8F9]/60">
            1080p60
          </span>
        </div>

        {/* Center Play Icon Skeleton */}
        <div className="flex flex-col items-center justify-center z-10 my-auto">
          <div className="w-11 h-11 rounded-lg bg-[#0b1f38]/90 border border-[#1e2a3d] flex items-center justify-center shadow-lg group-hover/video:border-[#67E8F9]/40 transition-colors">
            <span className="material-symbols-outlined text-[#67E8F9]/50 text-2xl animate-pulse">
              smart_display
            </span>
          </div>
        </div>

        {/* Bottom Timecode & Track Skeleton */}
        <div className="z-10 space-y-1.5">
          <div className="w-full h-1 bg-[#0b1b30] rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#67E8F9]/20 via-[#67E8F9]/60 to-[#67E8F9]/20 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-['JetBrains_Mono'] text-[#67809e]">
            <span className="animate-pulse">MOUNTING_STREAM...</span>
            <span>00:00 / --:--</span>
          </div>
        </div>
      </div>

      {/* Embedded Iframe */}
      {embedId ? (
        <iframe
          className={`w-full h-full relative z-0 transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={`https://www.youtube-nocookie.com/embed/${embedId}?rel=0&modestbranding=1`}
          title={`${title} - Showcase Demo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#071426]/70 border border-dashed border-[#1e2a3d]">
          <span className="material-symbols-outlined text-[#67E8F9]/70 text-3xl mb-1">
            smart_display
          </span>
          <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#F5F8FF]">
            YouTube Plugin Demo
          </span>
          <span className="text-[11px] text-[#869ab8] mt-0.5 font-['JetBrains_Mono']">
            Ready for iframe embed
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <article className="flex flex-col bg-[#0B1F38]/95 border border-[#1e2a3d] shadow-2xl overflow-hidden relative animate-pulse select-none">
      {/* Shimmer light sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#67E8F9]/5 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>

      {/* Accent top stripe */}
      <div className="h-1.5 w-full bg-[#1e2a3d]"></div>

      <div className="p-6 flex flex-col flex-1">
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="h-4 w-28 bg-[#142032] border border-[#1e2a3d]"></div>
          <div className="h-4 w-20 bg-[#030e20] border border-[#1e2a3d]"></div>
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-[#142032] mb-4"></div>

        {/* Video Box Skeleton */}
        <div className="w-full aspect-video bg-[#030e20] border border-[#1e2a3d] mb-4 relative overflow-hidden flex flex-col justify-between p-3.5">
          <div className="flex justify-between items-center">
            <div className="h-2.5 w-24 bg-[#142032]"></div>
            <div className="h-2.5 w-10 bg-[#142032]"></div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0b1f38] mx-auto flex items-center justify-center border border-[#1e2a3d]">
            <span className="material-symbols-outlined text-[#67E8F9]/30 text-xl">smart_display</span>
          </div>
          <div className="h-1 w-full bg-[#142032] rounded"></div>
        </div>

        {/* Description lines */}
        <div className="space-y-2 mb-5">
          <div className="h-3.5 w-full bg-[#142032]"></div>
          <div className="h-3.5 w-5/6 bg-[#142032]"></div>
        </div>

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#142032]"></div>
            <div className="h-3 w-4/5 bg-[#142032]"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#142032]"></div>
            <div className="h-3 w-2/3 bg-[#142032]"></div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto pt-4 border-t border-[#1e2a3d]">
          <div className="h-5 w-16 bg-[#142032] border border-[#1e2a3d]"></div>
          <div className="h-5 w-20 bg-[#142032] border border-[#1e2a3d]"></div>
          <div className="h-5 w-14 bg-[#142032] border border-[#1e2a3d]"></div>
        </div>

        {/* Actions grid */}
        <div className="pt-3 border-t border-[#1e2a3d] grid grid-cols-2 gap-2">
          <div className="h-8 bg-[#142032] border border-[#1e2a3d]"></div>
          <div className="h-8 bg-[#142032] border border-[#1e2a3d]"></div>
        </div>
      </div>
    </article>
  );
}

function PluginVideoModal({
  project,
  onClose,
}: {
  project: ProjectDetails;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} - Video Demo Theater`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Window */}
      <div
        className="w-full max-w-4xl bg-[#0B1F38] border border-[#1e2a3d] shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Stripe */}
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: project.accentColor }}
        ></div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#1e2a3d] bg-[#071426]/90 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-['JetBrains_Mono'] text-[#67E8F9] bg-[#030e20] px-2.5 py-0.5 border border-[#1e2a3d] uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-pulse"></span>
              Theater Mode
            </span>
            <div className="min-w-0">
              <h3 className="text-base sm:text-xl font-bold text-[#F5F8FF] uppercase truncate">
                {project.title}
              </h3>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbc9cf]">
                {project.platform} • {project.status}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#142032] hover:bg-[#1e2a3d] border border-[#1e2a3d] hover:border-[#67E8F9]/60 text-[#bbc9cf] hover:text-[#F5F8FF] font-['JetBrains_Mono'] text-xs uppercase transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <span>Close</span>
            <span className="text-[10px] text-[#859399] hidden sm:inline">[ESC]</span>
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* 16:9 Video Player Container */}
        <div className="w-full aspect-video bg-[#030e20] relative">
          {project.youtubeEmbedId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${project.youtubeEmbedId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${project.title} - Showcase Demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <span className="material-symbols-outlined text-4xl text-[#67E8F9]/50 mb-2">smart_display</span>
              <p className="text-sm font-['JetBrains_Mono'] text-[#F5F8FF]">No demo stream configured for this plugin</p>
            </div>
          )}
        </div>

        {/* Modal Footer with Quick Resource Links */}
        <div className="p-4 sm:p-5 bg-[#071426]/90 border-t border-[#1e2a3d] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* YouTube Link */}
            {(project.youtubeUrl || project.youtubeEmbedId) && (
              <a
                href={project.youtubeUrl || `https://www.youtube.com/watch?v=${project.youtubeEmbedId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF0000]/10 hover:bg-[#FF0000]/25 border border-[#FF0000]/40 text-[#ff8080] hover:text-white font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-colors"
                title={`Watch ${project.title} on YouTube`}
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#ff4b4b]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch on YouTube</span>
              </a>
            )}

            {/* GitHub Repo */}
            {project.isOpenSource && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#142032] hover:bg-[#1e2a3d] border border-[#3c494e] text-[#bbc9cf] hover:text-[#F5F8FF] font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-colors"
                title="View repository on GitHub"
              >
                <span className="material-symbols-outlined text-[15px]">code</span>
                <span>GitHub Repo</span>
              </a>
            )}

            {/* Spigot Link */}
            {project.spigotUrl && (
              <a
                href={project.spigotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f08c00]/10 hover:bg-[#f08c00]/25 border border-[#f08c00]/40 text-[#ffb049] hover:text-white font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-colors"
                title="View on SpigotMC"
              >
                <span className="material-symbols-outlined text-[15px]">extension</span>
                <span>SpigotMC</span>
              </a>
            )}

            {/* Paper Hangar */}
            {project.hangarUrl && (
              <a
                href={project.hangarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00b954]/10 hover:bg-[#00b954]/25 border border-[#00b954]/40 text-[#4ae176] hover:text-white font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-colors"
                title="View on Paper Hangar"
              >
                <span className="material-symbols-outlined text-[15px]">description</span>
                <span>Paper Hangar</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-['JetBrains_Mono'] text-[#859399] hover:text-[#67E8F9] transition-colors cursor-pointer ml-auto"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

interface FaqItem {
  id: number;
  question: string;
  answer: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: '1. What kind of Minecraft plugins do you develop?',
    answer: [
      "I develop custom Minecraft plugins tailored to your server's needs, including gameplay mechanics, custom systems, events, minigames, and integrations.",
      'Whether you have a new idea or need to improve an existing feature, feel free to get in touch.',
    ],
  },
  {
    id: 2,
    question: '2. Which server software and versions do you support?',
    answer: [
      'I work with Minecraft server plugin development, including Paper and Spigot-based environments.',
      'Compatibility depends on the project requirements, so we can discuss your server software and Minecraft version before development begins.',
    ],
  },
  {
    id: 3,
    question: '3. Can you work with existing plugins?',
    answer: [
      'Yes! I can help improve existing plugin setups, implement additional features, troubleshoot issues, and develop integrations between plugins.',
      'The feasibility depends on the plugins involved and the available APIs or source code.',
    ],
  },
  {
    id: 4,
    question: '4. How does the development process work?',
    answer: [
      'Every project starts with a conversation about your idea and requirements.',
      'From there, we define the scope, discuss the expected features, agree on the details, and move into development and testing.',
      "You'll know what to expect before development begins.",
    ],
  },
  {
    id: 5,
    question: '5. How much does a custom plugin cost?',
    answer: [
      'Pricing depends on the complexity, features, and requirements of each project.',
      'Once I understand what you need, I can provide a quote based on the project\'s scope.',
    ],
  },
  {
    id: 6,
    question: '6. How long does it take to develop a plugin?',
    answer: [
      'Development time depends on the complexity and scope of the project.',
      'Smaller features may take less time, while more advanced systems require additional development and testing. I\'ll discuss the expected timeline with you before starting.',
    ],
  },
  {
    id: 7,
    question: '7. Do you provide support after delivery?',
    answer: [
      'Post-delivery support and maintenance can be discussed as part of the project.',
      'The support period, included revisions, and any future updates will be agreed upon before development begins.',
    ],
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Game Modes' | 'Mechanics' | 'Folia/Async'>('All');
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectDetails | null>(null);

  // Lock body scroll and register ESC key handler when video modal is open
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveModalProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModalProject]);

  const handleTabChange = (tab: 'All' | 'Game Modes' | 'Mechanics' | 'Folia/Async') => {
    if (tab === activeTab) return;
    setIsTabTransitioning(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsTabTransitioning(false);
    }, 220);
  };

  // Frequently Asked Questions State
  const [openFaqIds, setOpenFaqIds] = useState<number[]>([1]);

  const toggleFaq = (id: number) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllFaqs = () => {
    if (openFaqIds.length === FAQ_ITEMS.length) {
      setOpenFaqIds([]);
    } else {
      setOpenFaqIds(FAQ_ITEMS.map((item) => item.id));
    }
  };

  // Hero Video State & Controls
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const pauseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideoFallback, setShowVideoFallback] = useState(false);

  // If paused and not resumed within 3 seconds, fade in standard hero image
  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        setShowVideoFallback(true);
      }, 3000);
    } else {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      setShowVideoFallback(false);
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoAudio = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState('portfolio-home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['portfolio-projects', 'services', 'process', 'about', 'contact-section'];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (scrollY < 400) {
        setActiveSection('portfolio-home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyDiscord = async (e: React.MouseEvent) => {
    e.preventDefault();
    await copyToClipboard('wpvoxel');
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    await copyToClipboard('commissions@voxelforcedev.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredProjects =
    activeTab === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <div className="bg-[#071426] text-[#d7e3fc] min-h-screen flex flex-col font-['Space_Grotesk'] selection:bg-[#67E8F9] selection:text-[#071426] overflow-x-hidden">
      {/* 1. FIXED RESPONSIVE HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#071426]/95 backdrop-blur-xl border-b-2 border-[#030e20] shadow-[0_4px_0_0_rgba(3,14,32,0.95)]">
        <div className="border-t border-t-[#3c494e]/40 border-b border-b-[#030e20]">
          <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="#"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 group p-1.5 bg-[#0f1c2e] border-t border-l border-t-[#3c494e]/40 border-l-[#3c494e]/40 border-b-2 border-r-2 border-b-[#030e20] border-r-[#030e20] transition-transform active:scale-95"
                aria-label="WP Voxel Home"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    alt="Voxel Forge Developer Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    src={ASSETS.headerLogo}
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#F5F8FF] tracking-tight uppercase group-hover:text-[#67E8F9] transition-colors px-1">
                  WP VOXEL
                </span>
              </a>

              {/* TPS Telemetry Badge */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#030e20] border-t-2 border-l-2 border-t-[#071426] border-l-[#071426] border-b border-r border-b-[#3c494e]/30 border-r-[#3c494e]/30 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#4ae176] animate-pulse shadow-[0_0_8px_#4ae176]"></span>
                <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#edd4ff] uppercase tracking-wider">
                  20.0 TPS • Available for Projects
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <a
                href="#portfolio-projects"
                className={`font-['JetBrains_Mono'] text-xs uppercase tracking-wider px-3 py-1.5 transition-colors border ${
                  activeSection === 'portfolio-projects'
                    ? 'bg-[#1e2a3d] text-[#67E8F9] border-[#67E8F9]/40'
                    : 'text-[#bbc9cf] hover:text-[#F5F8FF] border-transparent hover:border-[#3c494e]/40'
                }`}
              >
                Work
              </a>
              <a
                href="#services"
                className={`font-['JetBrains_Mono'] text-xs uppercase tracking-wider px-3 py-1.5 transition-colors border ${
                  activeSection === 'services'
                    ? 'bg-[#1e2a3d] text-[#67E8F9] border-[#67E8F9]/40'
                    : 'text-[#bbc9cf] hover:text-[#F5F8FF] border-transparent hover:border-[#3c494e]/40'
                }`}
              >
                Services
              </a>
              <a
                href="#process"
                className={`font-['JetBrains_Mono'] text-xs uppercase tracking-wider px-3 py-1.5 transition-colors border ${
                  activeSection === 'process'
                    ? 'bg-[#1e2a3d] text-[#67E8F9] border-[#67E8F9]/40'
                    : 'text-[#bbc9cf] hover:text-[#F5F8FF] border-transparent hover:border-[#3c494e]/40'
                }`}
              >
                Process
              </a>
              <a
                href="#about"
                className={`font-['JetBrains_Mono'] text-xs uppercase tracking-wider px-3 py-1.5 transition-colors border ${
                  activeSection === 'about'
                    ? 'bg-[#1e2a3d] text-[#67E8F9] border-[#67E8F9]/40'
                    : 'text-[#bbc9cf] hover:text-[#F5F8FF] border-transparent hover:border-[#3c494e]/40'
                }`}
              >
                About
              </a>
              <a
                href="#contact-section"
                className={`font-['JetBrains_Mono'] text-xs uppercase tracking-wider px-3 py-1.5 transition-colors border ${
                  activeSection === 'contact-section'
                    ? 'bg-[#1e2a3d] text-[#67E8F9] border-[#67E8F9]/40'
                    : 'text-[#bbc9cf] hover:text-[#F5F8FF] border-transparent hover:border-[#3c494e]/40'
                }`}
              >
                Contact
              </a>
            </nav>

            {/* Right Action / Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="#contact-section"
                className="hidden sm:inline-flex items-center justify-center font-bold text-xs uppercase px-4 py-2 bg-[#00b954] hover:bg-[#a5e7ff] text-[#F5F8FF] hover:text-[#003543] border-t-2 border-l-2 border-t-[#67E8F9] border-l-[#67E8F9] border-b-2 border-r-2 border-b-[#00566a] border-r-[#00566a] shadow-[0_0_16px_rgba(103,232,249,0.35)] hover:shadow-[0_0_24px_rgba(103,232,249,0.6)] active:translate-y-0.5 transition-all"
              >
                Let's Talk
              </a>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 bg-[#142032] border border-[#3c494e] text-[#67E8F9] hover:bg-[#1e2a3d] focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#071426] border-b-2 border-[#00b954] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#1e2a3d]">
              <span className="font-['JetBrains_Mono'] text-xs text-[#edd4ff] uppercase">
                20.0 TPS • Active Online
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4ae176] animate-pulse"></span>
            </div>
            <a
              href="#portfolio-projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-['JetBrains_Mono'] text-sm uppercase py-2 px-3 text-[#d7e3fc] hover:bg-[#142032] hover:text-[#67E8F9] transition-colors"
            >
              Work
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-['JetBrains_Mono'] text-sm uppercase py-2 px-3 text-[#d7e3fc] hover:bg-[#142032] hover:text-[#67E8F9] transition-colors"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-['JetBrains_Mono'] text-sm uppercase py-2 px-3 text-[#d7e3fc] hover:bg-[#142032] hover:text-[#67E8F9] transition-colors"
            >
              Process
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-['JetBrains_Mono'] text-sm uppercase py-2 px-3 text-[#d7e3fc] hover:bg-[#142032] hover:text-[#67E8F9] transition-colors"
            >
              About
            </a>
            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-['JetBrains_Mono'] text-sm uppercase py-2 px-3 text-[#67E8F9] bg-[#142032] font-semibold"
            >
              Contact & Commission
            </a>
          </div>
        )}
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="w-full pt-20 flex-1">
        {/* 2. IMMERSIVE MINECRAFT HERO SECTION */}
        <section className="relative w-full min-h-[860px] lg:min-h-[942px] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
          {/* Background Container with Video & Fallback Poster Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
            {/* Fallback Poster Image (always rendered underneath) */}
            <img
              alt="Cinematic Minecraft landscape background wallpaper"
              className="w-full h-full object-cover object-center scale-105 absolute inset-0 z-0"
              src={ASSETS.heroWallpaper}
            />

            {/* Video Background Layer */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className={`w-full h-full object-cover object-center scale-105 absolute inset-0 z-0 transition-opacity duration-1000 ${
                videoLoaded && !showVideoFallback ? 'opacity-90' : 'opacity-0'
              }`}
            >
              <source src={TRAILER_VIDEO_URL} type="video/webm" />
              <source src={TRAILER_VIDEO_URL} type="video/mp4" />
            </video>

            {/* Scrims and Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/80 via-[#0B1F38]/70 to-[#071426]/95 backdrop-blur-[1px] z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_40%,rgba(103,232,249,0.14),transparent_80%)] z-10"></div>

            {/* Ambient Redstone & Cyan Particles */}
            <div className="absolute bottom-24 left-1/4 w-3 h-3 rounded-full bg-[#FF4D4F] blur-sm animate-redstone z-10"></div>
            <div className="absolute bottom-36 left-1/3 w-2 h-2 rounded-full bg-[#FF4D4F] blur-xs animate-redstone delay-700 z-10"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#67E8F9] blur-sm animate-pulse z-10"></div>

            {/* Subtle Voxel Grid Overlay */}
            <div className="absolute inset-0 opacity-20 z-10 bg-[linear-gradient(to_right,rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(103,232,249,0.08)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#071426] via-[#071426]/95 to-transparent z-20"></div>
          </div>

          {/* Hero Foreground Content */}
          <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 my-auto py-6 sm:py-10">
            {/* Left Column: Heading, Pitch, Badges, CTAs */}
            <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1e2a3d]/90 backdrop-blur-md border border-[#67E8F9]/30 shadow-[0_0_15px_rgba(103,232,249,0.25)] mb-6">
                <span className="w-2.5 h-2.5 bg-[#67E8F9] shadow-[0_0_10px_#67E8F9] animate-pulse"></span>
                <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#67E8F9] uppercase tracking-wider font-semibold">
                  MINECRAFT PLUGIN DEVELOPER • PAPER / SPIGOT / FOLIA
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#F5F8FF] max-w-3xl leading-[1.1] mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                I BUILD CUSTOM{' '}
                <span className="text-[#67E8F9] drop-shadow-[0_0_24px_rgba(103,232,249,0.6)]">
                  MINECRAFT PLUGINS
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#bbc9cf] max-w-2xl mb-8 leading-relaxed drop-shadow-sm">
                Custom gameplay systems, mechanics, and integrations that help Minecraft servers
                stand out, eliminate TPS lag, and dominate player retention.
              </p>

              {/* Interactive CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <a
                  href="#portfolio-projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00b954] hover:bg-[#00d2ff] text-[#F5F8FF] hover:text-[#003543] font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_24px_rgba(103,232,249,0.35)] hover:shadow-[0_0_32px_rgba(103,232,249,0.7)] group border-t border-[#67E8F9]"
                >
                  <span>Explore My Work</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
                <a
                  href="#contact-section"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0B1F38]/90 hover:bg-[#293549] text-[#67E8F9] font-bold text-sm uppercase tracking-wider transition-all duration-200 backdrop-blur-md border border-[#67E8F9]/40 shadow-md"
                >
                  <span>Discuss a Project</span>
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </a>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
                <span className="px-3 py-1 bg-[#030e20]/90 border border-[#3c494e]/50 text-[#bbc9cf] font-['JetBrains_Mono'] text-xs uppercase backdrop-blur-sm">
                  [Custom Plugins]
                </span>
                <span className="px-3 py-1 bg-[#030e20]/90 border border-[#3c494e]/50 text-[#bbc9cf] font-['JetBrains_Mono'] text-xs uppercase backdrop-blur-sm">
                  [Gameplay Systems]
                </span>
                <span className="px-3 py-1 bg-[#030e20]/90 border border-[#3c494e]/50 text-[#bbc9cf] font-['JetBrains_Mono'] text-xs uppercase backdrop-blur-sm">
                  [Plugin Fixes & Integrations]
                </span>
              </div>

              {/* 4-Item Telemetry Shelf (Responsive 2x2 on mobile, 4x1 on desktop) */}
              <div className="w-full max-w-2xl bg-[#030e20]/95 backdrop-blur-md p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 border border-[#00b954]/30 shadow-2xl">
                <div className="flex flex-col items-center justify-center text-center p-2 bg-[#071426]/60 border border-[#1e2a3d]">
                  <div className="flex items-center gap-1.5 text-[#edd4ff] font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">speed</span>
                    <span>20.0 TPS</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbc9cf] uppercase mt-1">
                    Optimized Profiling
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center p-2 bg-[#071426]/60 border border-[#1e2a3d]">
                  <div className="flex items-center gap-1.5 text-[#4ae176] font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">code</span>
                    <span>Java 17/21 & Kotlin</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbc9cf] uppercase mt-1">
                    Modern Standards
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center p-2 bg-[#071426]/60 border border-[#1e2a3d]">
                  <div className="flex items-center gap-1.5 text-[#67E8F9] font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                    <span>Async Threads</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbc9cf] uppercase mt-1">
                    Zero Main Stalls
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center p-2 bg-[#071426]/60 border border-[#1e2a3d]">
                  <div className="flex items-center gap-1.5 text-[#f0dbff] font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">memory</span>
                    <span>0 Memory Leaks</span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbc9cf] uppercase mt-1">
                    Strict Heap Audits
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Minecraft Character Rig */}
            <div className="w-full lg:w-2/5 flex flex-col items-center justify-center relative mt-8 lg:mt-0">
              <div className="absolute w-72 h-72 rounded-full bg-[#67E8F9]/15 filter blur-3xl -z-10 pointer-events-none"></div>

              <div className="relative flex flex-col items-center animate-mc-float group select-none">
                {/* Speech Bubble */}
                <div className="relative z-20 mb-3 px-4 py-2 bg-[#1e2a3d]/95 backdrop-blur-md border-2 border-[#67E8F9] shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ae176] animate-ping"></span>
                  <span className="font-bold text-sm text-[#F5F8FF] uppercase tracking-wider">
                    Hey, I'm WP!
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] px-1.5 py-0.5 bg-[#edd4ff]/20 text-[#edd4ff] border border-[#edd4ff]/40 uppercase">
                    [Online]
                  </span>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#67E8F9]"></div>
                </div>

                {/* Character Rig Image Wrapper */}
                <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[3/4] flex items-center justify-center">
                  <img
                    alt="VoxelForge Custom Minecraft Skin Rig Character"
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] drop-shadow-[0_0_20px_rgba(103,232,249,0.35)]"
                    src={ASSETS.skinRig}
                  />
                  <span className="absolute -top-3 -left-4 text-[#67E8F9] text-xl animate-pulse">✦</span>
                  <span className="absolute top-1/2 -right-6 text-[#edd4ff] text-lg animate-ping">✨</span>
                  <span className="absolute bottom-10 -left-6 text-[#FF4D4F] text-base animate-pulse">●</span>
                </div>

                {/* Terminal State Pill */}
                <div className="absolute bottom-6 -left-2 sm:-left-8 md:-left-12 bg-[#0B1F38]/95 border border-[#67E8F9]/50 shadow-[0_0_20px_rgba(103,232,249,0.25)] p-2.5 flex items-center gap-2.5 backdrop-blur-md transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-7 h-7 bg-[#293549] border border-[#67E8F9]/40 flex items-center justify-center text-[#67E8F9]">
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#67E8F9]">
                      VoxelCore::ready()
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbc9cf]">
                      PaperMC & Folia API
                    </span>
                  </div>
                </div>

                {/* Character Shadow */}
                <div className="w-48 h-3.5 bg-[#071426]/90 rounded-full filter blur-[2px] mt-1 shadow-[0_0_15px_rgba(0,0,0,0.9)]"></div>
              </div>
            </div>
          </div>

          {/* Hero Video Controls Widget */}
          <div className="relative z-30 max-w-7xl w-full mx-auto flex items-center justify-end px-4 sm:px-6 lg:px-8 mt-2 pb-3">
            <div className="inline-flex items-center gap-1.5 p-1 bg-[#030e20]/90 backdrop-blur-md border border-[#1e2a3d] hover:border-[#67E8F9]/50 shadow-xl">
              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={toggleVideoPlayback}
                className="p-1.5 bg-[#142032] hover:bg-[#1e2a3d] text-[#F5F8FF] hover:text-[#67E8F9] transition-colors border border-[#3c494e]/40 cursor-pointer"
                title={isVideoPlaying ? 'Pausar Vídeo' : 'Reproduzir Vídeo'}
                aria-label={isVideoPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isVideoPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Mute / Unmute Toggle */}
              <button
                type="button"
                onClick={toggleVideoAudio}
                className="p-1.5 bg-[#142032] hover:bg-[#1e2a3d] text-[#F5F8FF] hover:text-[#67E8F9] transition-colors border border-[#3c494e]/40 cursor-pointer"
                title={isVideoMuted ? 'Ativar Áudio' : 'Desativar Áudio'}
                aria-label={isVideoMuted ? 'Ativar áudio' : 'Desativar áudio'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isVideoMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK / PORTFOLIO PROJECTS */}
        <section
          className="relative w-full overflow-hidden border-y border-[#030e20]"
          id="portfolio-projects"
        >
          {/* Background Starry Sky with Responsive Image Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
            <img
              alt="Minecraft starry night sky with square moon and dark block mountains"
              className="w-full h-full object-cover object-center scale-105 pointer-events-none"
              src={ASSETS.starrySky}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071426] via-[#071426]/80 to-[#071426] backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-[#071426]/40"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_45%,rgba(7,20,38,0.55),rgba(3,14,32,0.92))]"></div>
            <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#071426] via-[#071426]/80 to-transparent"></div>
          </div>

          {/* Flying Bats Animation Layer (Scaled 2x-3x, 7 Multi-Depth Paths) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-[1]">
            {/* Bat 1: High Altitude (Left to Right, 140px) */}
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-36 sm:h-36 bat-fly-top-1">
              <div className="animate-bat-flutter w-full h-full">
                <img
                  alt="Flying Minecraft Bat"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
                  src={ASSETS.bat}
                />
              </div>
            </div>

            {/* Bat 2: High Sky Dive (Right to Left, 120px) */}
            <div className="absolute top-0 left-0 w-28 h-28 sm:w-32 sm:h-32 bat-fly-top-2">
              <div className="animate-bat-flutter w-full h-full" style={{ animationDelay: '-0.12s' }}>
                <img
                  alt="Flying Minecraft Bat"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
                  src={ASSETS.bat}
                />
              </div>
            </div>

            {/* Bat 3: Foreground Lead (Left to Right, 180px - Giant 3x bat) */}
            <div className="absolute top-0 left-0 w-40 h-40 sm:w-48 sm:h-48 bat-fly-mid-1">
              <div className="animate-bat-flutter w-full h-full" style={{ animationDelay: '-0.24s' }}>
                <img
                  alt="Minecraft Flying Bat - Foreground Giant"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(103,232,249,0.25)]"
                  src={ASSETS.bat}
                />
              </div>
            </div>

            {/* Bat 4: Mid Cross (Right to Left, 150px) */}
            <div className="absolute top-0 left-0 w-36 h-36 sm:w-40 sm:h-40 bat-fly-mid-2">
              <div className="animate-bat-flutter w-full h-full" style={{ animationDelay: '-0.18s' }}>
                <img
                  alt="Minecraft Flying Bat"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
                  src={ASSETS.bat}
                />
              </div>
            </div>

            {/* Bat 5: Mid Erratic Swoop (Left to Right, 125px) */}
            <div className="absolute top-0 left-0 w-28 h-28 sm:w-32 sm:h-32 bat-fly-mid-3">
              <div className="animate-bat-flutter w-full h-full" style={{ animationDelay: '-0.08s' }}>
                <img
                  alt="Minecraft Flying Bat"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)]"
                  src={ASSETS.bat}
                />
              </div>
            </div>

            {/* Bat 6: Lower Mid Glider (Left to Right, 145px) */}
            <div className="absolute top-0 left-0 w-36 h-36 sm:w-40 sm:h-40 bat-fly-low-1">
              <div className="animate-bat-flutter w-full h-full" style={{ animationDelay: '-0.2s' }}>
                <img
                  alt="Minecraft Flying Bat"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.95)]"
                  src={ASSETS.bat}
                />
              </div>
            </div>

            {/* Bat 7: Horizon Skim (Right to Left, 160px) */}
            <div className="absolute top-0 left-0 w-36 h-36 sm:w-44 sm:h-44 bat-fly-low-2">
              <div className="animate-bat-flutter w-full h-full" style={{ animationDelay: '-0.15s' }}>
                <img
                  alt="Minecraft Flying Bat"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.95)]"
                  src={ASSETS.bat}
                />
              </div>
            </div>
          </div>

          {/* Projects Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-4">
              <div>
                <div className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#67E8F9] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-[#00b954]"></span>
                  FEATURED SYSTEMS & PRODUCTION PLUGINS
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold uppercase text-[#F5F8FF] tracking-tight drop-shadow-md">
                  BUILT FOR UNIQUE GAMEPLAY
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#bbc9cf] max-w-md drop-shadow-sm">
                Selected Minecraft plugin projects, gameplay systems, and custom development work
                engineered for extreme player concurrency and zero TPS drop.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-10 border-b border-[#1e2a3d] pb-3">
              {(['All', 'Game Modes', 'Mechanics', 'Folia/Async'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`font-['JetBrains_Mono'] text-xs uppercase px-3 py-1.5 transition-colors border ${
                    activeTab === tab
                      ? 'bg-[#142032] text-[#67E8F9] border-[#67E8F9]/60 shadow-[0_0_10px_rgba(103,232,249,0.3)]'
                      : 'text-[#bbc9cf] hover:text-[#F5F8FF] border-transparent hover:border-[#3c494e]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isTabTransitioning ? (
                <>
                  <ProjectCardSkeleton />
                  <ProjectCardSkeleton />
                  <ProjectCardSkeleton />
                </>
              ) : (
                filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="flex flex-col bg-[#0B1F38]/95 border border-[#1e2a3d] hover:border-[#67E8F9]/50 shadow-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: project.accentColor }}
                    ></div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="font-['JetBrains_Mono'] text-xs uppercase flex items-center gap-1.5 text-[#4ae176]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-ping"></span>{' '}
                          {project.status}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#bbc9cf] bg-[#030e20] px-2 py-0.5 border border-[#1e2a3d]">
                          {project.platform}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#F5F8FF] uppercase mb-3 group-hover:text-[#67E8F9] transition-colors">
                        {project.title}
                      </h3>

                      {/* YouTube Video Showcase Container Beneath Title with Loading Skeleton */}
                      <ProjectVideoWithSkeleton
                        title={project.title}
                        embedId={project.youtubeEmbedId}
                        onOpenModal={() => setActiveModalProject(project)}
                      />

                    <p className="text-sm text-[#bbc9cf] mb-5 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2 mb-6 text-xs sm:text-sm text-[#bbc9cf]">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[#67E8F9] text-[16px] mt-0.5 flex-shrink-0">
                            check_circle
                          </span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto pt-4 border-t border-[#1e2a3d]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-['JetBrains_Mono'] text-[11px] text-[#4ae176] bg-[#142032] border border-[#1e2a3d] px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="pt-3 border-t border-[#1e2a3d]">
                      {/* Primary On-Site Demo Theater Trigger */}
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="w-full mb-2.5 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#67E8F9]/10 hover:bg-[#67E8F9]/25 border border-[#67E8F9]/40 hover:border-[#67E8F9] text-[#67E8F9] hover:text-[#F5F8FF] font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm group/site"
                        title={`Watch ${project.title} demo directly in on-site theater`}
                      >
                        <span className="material-symbols-outlined text-[17px] group-hover/site:scale-110 transition-transform text-[#67E8F9]">
                          play_circle
                        </span>
                        <span className="font-bold">Watch on Site</span>
                        <span className="material-symbols-outlined text-[14px] opacity-70 ml-auto">
                          open_in_full
                        </span>
                      </button>

                      {/* External Action Links: Demo, GitHub, Spigot, Hangar */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* 1. Show Demo (YouTube) */}
                        {(project.youtubeUrl || project.youtubeEmbedId) && (
                          <a
                            href={project.youtubeUrl || `https://www.youtube.com/watch?v=${project.youtubeEmbedId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 bg-[#FF0000]/10 hover:bg-[#FF0000]/25 border border-[#FF0000]/40 hover:border-[#FF0000] text-[#ff8080] hover:text-white font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider transition-all duration-200 group/btn"
                            title={`Watch ${project.title} demo on YouTube`}
                          >
                            <svg className="w-3.5 h-3.5 fill-current text-[#ff4b4b] group-hover/btn:scale-110 transition-transform flex-shrink-0" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <span>Show Demo</span>
                          </a>
                        )}

                        {/* 2. Open Source / View Code (GitHub) */}
                        {project.isOpenSource && project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 bg-[#142032] hover:bg-[#1e2a3d] border border-[#3c494e] hover:border-[#F5F8FF]/60 text-[#bbc9cf] hover:text-[#F5F8FF] font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider transition-all duration-200 group/btn"
                            title="View open-source repository on GitHub"
                          >
                            <svg className="w-3.5 h-3.5 fill-current text-[#bbc9cf] group-hover/btn:text-[#F5F8FF] transition-colors flex-shrink-0" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                            </svg>
                            <span>View Code</span>
                          </a>
                        ) : null}

                        {/* 3. SpigotMC Resource Page */}
                        {project.spigotUrl && (
                          <a
                            href={project.spigotUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 bg-[#f08c00]/10 hover:bg-[#f08c00]/25 border border-[#f08c00]/40 hover:border-[#f08c00] text-[#ffb049] hover:text-white font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider transition-all duration-200 group/btn"
                            title="Download or view resource on SpigotMC"
                          >
                            <span className="material-symbols-outlined text-[15px] text-[#ffb049] flex-shrink-0">extension</span>
                            <span>SpigotMC</span>
                          </a>
                        )}

                        {/* 4. Paper Hangar Resource Page */}
                        {project.hangarUrl && (
                          <a
                            href={project.hangarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 bg-[#00b954]/10 hover:bg-[#00b954]/25 border border-[#00b954]/40 hover:border-[#00b954] text-[#4ae176] hover:text-white font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider transition-all duration-200 group/btn"
                            title="Download or view resource on Paper Hangar"
                          >
                            <span className="material-symbols-outlined text-[15px] text-[#4ae176] flex-shrink-0">description</span>
                            <span>Hangar</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* 4. SERVICES SECTION */}
        <section className="w-full bg-[#0f1c2e] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#030e20]" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#67E8F9] uppercase tracking-widest block mb-2 font-semibold">
                END-TO-END SERVER ENGINEERING
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase text-[#F5F8FF] tracking-tight mb-4">
                WHAT CAN I BUILD FOR YOUR SERVER?
              </h2>
              <p className="text-sm sm:text-base text-[#bbc9cf] leading-relaxed">
                End-to-end engineering tailored for competitive networks, survival SMPs, and custom
                game modes requiring extreme TPS reliability and clean code standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Service 1 */}
              <div className="bg-[#0B1F38] border border-[#1e2a3d] p-6 sm:p-8 shadow-xl flex flex-col justify-between group hover:border-[#67E8F9]/40 hover:bg-[#142032] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#859399]/40 font-['JetBrains_Mono']">
                      01
                    </span>
                    <div className="w-12 h-12 bg-[#1e2a3d] border border-[#67E8F9]/30 flex items-center justify-center text-[#67E8F9]">
                      <span className="material-symbols-outlined text-[28px]">extension</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[#F5F8FF] mb-3">
                    Custom Plugin Development
                  </h3>
                  <p className="text-xs sm:text-sm text-[#bbc9cf] leading-relaxed mb-6">
                    Bespoke mechanics and features designed around your server's vision. From
                    original minigames to robust economy engines, custom mob AI behaviors, and
                    inventory management with frame-accurate control.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1e2a3d] bg-[#030e20]/60 p-3">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#67E8F9] uppercase font-semibold">
                    Turnaround: 3 - 10 Days
                  </span>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-[#0B1F38] border border-[#1e2a3d] p-6 sm:p-8 shadow-xl flex flex-col justify-between group hover:border-[#67E8F9]/40 hover:bg-[#142032] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#859399]/40 font-['JetBrains_Mono']">
                      02
                    </span>
                    <div className="w-12 h-12 bg-[#1e2a3d] border border-[#edd4ff]/30 flex items-center justify-center text-[#edd4ff]">
                      <span className="material-symbols-outlined text-[28px]">bug_report</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[#F5F8FF] mb-3">
                    Bug Fixes & Maintenance
                  </h3>
                  <p className="text-xs sm:text-sm text-[#bbc9cf] leading-relaxed mb-6">
                    Troubleshooting, performance audits, compatibility adjustments, and updates for
                    existing plugins. Resolving TPS drops, thread lockups, memory leaks, and version
                    migrations safely.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1e2a3d] bg-[#030e20]/60 p-3">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#edd4ff] uppercase font-semibold">
                    Audit Baseline: Spark Profiling
                  </span>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-[#0B1F38] border border-[#1e2a3d] p-6 sm:p-8 shadow-xl flex flex-col justify-between group hover:border-[#67E8F9]/40 hover:bg-[#142032] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#859399]/40 font-['JetBrains_Mono']">
                      03
                    </span>
                    <div className="w-12 h-12 bg-[#1e2a3d] border border-[#8A3FFC]/30 flex items-center justify-center text-[#8A3FFC]">
                      <span className="material-symbols-outlined text-[28px]">hub</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[#F5F8FF] mb-3">
                    Gameplay Systems & Integrations
                  </h3>
                  <p className="text-xs sm:text-sm text-[#bbc9cf] leading-relaxed mb-6">
                    Live events, RPG progression trees, custom GUIs, and integrations between
                    existing systems. Bridging Discord webhooks, web stores, Tebex APIs, and
                    distributed server databases seamlessly.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1e2a3d] bg-[#030e20]/60 p-3">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#4ae176] uppercase font-semibold">
                    Network Ready: Bungee / Velocity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. DEVELOPMENT PROCESS SECTION */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="process">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#67E8F9] uppercase tracking-widest block mb-2 font-semibold">
              ENGINEERING METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase text-[#F5F8FF] tracking-tight mb-4">
              FROM IDEA TO IN-GAME
            </h2>
            <p className="text-sm sm:text-base text-[#bbc9cf]">
              A transparent, structured engineering lifecycle designed for zero downtime and effortless
              deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0B1F38] border border-[#1e2a3d] p-6 shadow-xl flex flex-col relative group hover:border-[#00b954] transition-colors">
              <div className="w-12 h-12 bg-[#00b954] text-[#003543] font-bold text-lg flex items-center justify-center mb-4 shadow-md font-['JetBrains_Mono']">
                01
              </div>
              <h4 className="text-lg font-bold uppercase text-[#F5F8FF] mb-2">Understand</h4>
              <p className="text-xs sm:text-sm text-[#bbc9cf] leading-relaxed">
                Discuss your idea, requirements, target server software (Paper / Purpur / Folia), and
                minimum player concurrency baseline.
              </p>
            </div>

            <div className="bg-[#0B1F38] border border-[#1e2a3d] p-6 shadow-xl flex flex-col relative group hover:border-[#00d2ff] transition-colors">
              <div className="w-12 h-12 bg-[#00d2ff] text-[#003543] font-bold text-lg flex items-center justify-center mb-4 shadow-md font-['JetBrains_Mono']">
                02
              </div>
              <h4 className="text-lg font-bold uppercase text-[#F5F8FF] mb-2">Plan</h4>
              <p className="text-xs sm:text-sm text-[#bbc9cf] leading-relaxed">
                Define feature specifications, data structures, event lifecycles, and deliverable
                milestones before touching production code.
              </p>
            </div>

            <div className="bg-[#0B1F38] border border-[#1e2a3d] p-6 shadow-xl flex flex-col relative group hover:border-[#8A3FFC] transition-colors">
              <div className="w-12 h-12 bg-[#8A3FFC] text-[#F5F8FF] font-bold text-lg flex items-center justify-center mb-4 shadow-md font-['JetBrains_Mono']">
                03
              </div>
              <h4 className="text-lg font-bold uppercase text-[#F5F8FF] mb-2">Build</h4>
              <p className="text-xs sm:text-sm text-[#bbc9cf] leading-relaxed">
                Develop and test in isolated local staging environments with continuous integration,
                Spark profilers, and memory leak monitors.
              </p>
            </div>

            <div className="bg-[#0B1F38] border border-[#1e2a3d] p-6 shadow-xl flex flex-col relative group hover:border-[#dab1ff] transition-colors">
              <div className="w-12 h-12 bg-[#dab1ff] text-[#490080] font-bold text-lg flex items-center justify-center mb-4 shadow-md font-['JetBrains_Mono']">
                04
              </div>
              <h4 className="text-lg font-bold uppercase text-[#F5F8FF] mb-2">Deliver</h4>
              <p className="text-xs sm:text-sm text-[#bbc9cf] leading-relaxed">
                Test on live staging with server staff, review functionality, address edge-cases, and
                hand over compiled JARs and documentation.
              </p>
            </div>
          </div>
        </section>

        {/* 6. ABOUT THE DEVELOPER (MORE THAN JUST CODE) */}
        <section className="w-full bg-[#0f1c2e] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-[#030e20]" id="about">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Terminal & Identity Console */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md bg-[#0B1F38] border border-[#1e2a3d] p-4 sm:p-6 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-4 bg-[#030e20] px-3 py-2 border border-[#1e2a3d]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4F]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFA726]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4ae176]"></span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#859399]">
                    VoxelCore.kt [Active Runtime]
                  </span>
                </div>

                {/* Responsive Image Container */}
                <div className="relative w-full aspect-square bg-[#030e20] flex items-center justify-center p-6 mb-4 overflow-hidden border border-[#1e2a3d]">
                  <img
                    alt="Voxel Forge Developer Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(103,232,249,0.4)]"
                    src={ASSETS.aboutLogo}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-center font-['JetBrains_Mono'] text-xs">
                  <div className="bg-[#142032] p-3 border border-[#1e2a3d]">
                    <div className="text-[#67E8F9] font-bold text-base sm:text-lg">1+ YEARS</div>
                    <div className="text-[#bbc9cf] text-[11px] mt-0.5">MC ECOSYSTEM</div>
                  </div>
                  <div className="bg-[#142032] p-3 border border-[#1e2a3d]">
                    <div className="text-[#4ae176] font-bold text-base sm:text-lg">99.98%</div>
                    <div className="text-[#bbc9cf] text-[11px] mt-0.5">TICK STABILITY</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#67E8F9] uppercase tracking-widest block font-semibold">
                BEHIND THE CODE
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase text-[#F5F8FF] tracking-tight">
                MORE THAN JUST CODE
              </h2>
              <p className="text-base sm:text-lg text-[#d7e3fc] leading-relaxed">
                I enjoy turning ideas into working systems. My experience with Minecraft plugin
                development has involved building gameplay mechanics, custom systems, and
                integrations. I focus on understanding what a server needs and translating that into
                practical, rock-solid technical solutions.
              </p>

              <div className="p-5 bg-[#0B1F38] border border-[#1e2a3d] shadow-md space-y-3">
                <div className="font-['JetBrains_Mono'] text-xs text-[#67E8F9] uppercase font-semibold">
                  Guaranteed Standards
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#d7e3fc]">
                    <span className="material-symbols-outlined text-[#4ae176] text-[18px]">
                      verified
                    </span>
                    <span>Zero TPS drag under 100+ players</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#d7e3fc]">
                    <span className="material-symbols-outlined text-[#4ae176] text-[18px]">
                      verified
                    </span>
                    <span>Clean modular codebase</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#d7e3fc]">
                    <span className="material-symbols-outlined text-[#4ae176] text-[18px]">
                      verified
                    </span>
                    <span>Detailed YAML configurations</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#859399] uppercase block mb-3 font-semibold">
                  Core Engineering Stack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Java 17/21',
                    'Kotlin',
                    'PaperMC',
                    'Folia',
                    'Spigot',
                    'ProtocolLib',
                    'MiniMessage',
                    'Redis',
                    'MongoDB',
                    'Gradle',
                    'Docker',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#142032] border border-[#1e2a3d] font-['JetBrains_Mono'] text-xs text-[#F5F8FF] hover:border-[#67E8F9]/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT & COMMISSION SECTION (WITH DYNAMIC AMBIENT FLYING ALLAYS) */}
        <section
          className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#030e20]"
          id="contact-section"
        >
          {/* Backdrop Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071426] via-[#071426]/95 to-[#071426] pointer-events-none z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(103,232,249,0.06),transparent_75%)] pointer-events-none z-0"></div>

          {/* DYNAMIC AMBIENT FLYING ALLAYS LAYER: Behind text and cards (z-[1], pointer-events-none) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-[1]">
            {/* Allay 1: Left to Right */}
            <div className="absolute top-0 left-0 w-16 h-16 animate-allay-l2r-1">
              <div className="animate-allay-bob">
                <img
                  alt="Minecraft Flying Allay"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(103,232,249,0.7)]"
                  src={ASSETS.allay}
                />
              </div>
            </div>
            {/* Allay 2: Right to Left */}
            <div className="absolute top-0 left-0 w-14 h-14 animate-allay-r2l-1">
              <div className="animate-allay-bob" style={{ animationDelay: '-2s' }}>
                <img
                  alt="Minecraft Flying Allay"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(103,232,249,0.65)]"
                  src={ASSETS.allay}
                />
              </div>
            </div>
            {/* Allay 3: Left to Right mid elevation */}
            <div className="absolute top-0 left-0 w-20 h-20 animate-allay-l2r-2">
              <div className="animate-allay-bob" style={{ animationDelay: '-4s' }}>
                <img
                  alt="Minecraft Flying Allay"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(103,232,249,0.85)]"
                  src={ASSETS.allay}
                />
              </div>
            </div>
            {/* Allay 4: Right to Left mid elevation */}
            <div className="absolute top-0 left-0 w-12 h-12 animate-allay-r2l-2">
              <div className="animate-allay-bob" style={{ animationDelay: '-1.5s' }}>
                <img
                  alt="Minecraft Flying Allay"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_9px_rgba(103,232,249,0.6)]"
                  src={ASSETS.allay}
                />
              </div>
            </div>
            {/* Allay 5: Left to Right lower elevation */}
            <div className="absolute top-0 left-0 w-16 h-16 animate-allay-l2r-3">
              <div className="animate-allay-bob" style={{ animationDelay: '-3.5s' }}>
                <img
                  alt="Minecraft Flying Allay"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(103,232,249,0.75)]"
                  src={ASSETS.allay}
                />
              </div>
            </div>
            {/* Allay 6: Right to Left lower elevation */}
            <div className="absolute top-0 left-0 w-14 h-14 animate-allay-r2l-3">
              <div className="animate-allay-bob" style={{ animationDelay: '-5s' }}>
                <img
                  alt="Minecraft Flying Allay"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_11px_rgba(103,232,249,0.7)]"
                  src={ASSETS.allay}
                />
              </div>
            </div>
          </div>

          {/* Foreground Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#67E8F9] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#00b954]"></span>
                GET IN TOUCH
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase text-[#F5F8FF] tracking-tight mb-3 drop-shadow-md">
                LET'S BUILD SOMETHING DIFFERENT.
              </h2>
              <p className="text-sm sm:text-base text-[#bbc9cf]">
                Have a custom plugin idea, a feature to implement, or an existing plugin that needs
                improvement? Tell me what you're working on.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Direct Discord Card & Links (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Interactive Discord Direct Box */}
                <div className="bg-[#0B1F38]/95 border-2 border-[#67E8F9]/50 hover:border-[#67E8F9] p-6 sm:p-8 shadow-2xl transition-all duration-200 group relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#67E8F9]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#67E8F9]/20 transition-all"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00b954] text-[#003543] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">chat</span>
                      </div>
                      <div>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#67E8F9] uppercase tracking-wider block font-semibold">
                          FASTEST RESPONSE
                        </span>
                        <h3 className="text-xl font-bold text-[#F5F8FF] uppercase">
                          Discord Direct
                        </h3>
                      </div>
                    </div>

                    <a
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00b954] hover:bg-[#67E8F9] text-[#003543] font-bold text-xs uppercase tracking-wider transition-colors shadow-md whitespace-nowrap"
                      href="https://discord.com/users/291955215446441984"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>Open Discord Profile</span>
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>

                  <div className="bg-[#030e20] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#00b954]/20">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4ae176] shadow-[0_0_8px_#4ae176]"></span>
                      <div>
                        <span className="font-['JetBrains_Mono'] text-base text-[#F5F8FF] font-semibold">
                          wpvoxel
                        </span>
                        <span className="text-xs text-[#bbc9cf] font-['JetBrains_Mono'] ml-2 block sm:inline">
                          (ID: 291955215446441984)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyDiscord}
                        className="px-3 py-1.5 bg-[#142032] hover:bg-[#1e2a3d] text-[#67E8F9] font-['JetBrains_Mono'] text-xs uppercase flex items-center gap-1.5 transition-colors border border-[#3c494e]/40"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedDiscord ? 'done' : 'content_copy'}
                        </span>
                        <span>{copiedDiscord ? 'Copied!' : 'Copy Tag'}</span>
                      </button>
                      <a
                        className="px-3 py-1.5 bg-[#142032] hover:bg-[#1e2a3d] text-[#67E8F9] font-['JetBrains_Mono'] text-xs uppercase flex items-center gap-1.5 transition-colors border border-[#3c494e]/40"
                        href="https://discord.com/users/291955215446441984"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[14px]">link</span>
                        <span>Connect</span>
                      </a>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#bbc9cf] mt-4 leading-relaxed">
                    Active daily. Click above to open my profile directly, send a DM, or discuss
                    your server's plugin requirements.
                  </p>
                </div>

                {/* Direct Email Card */}
                <div className="bg-[#0B1F38]/95 border border-[#00b954]/20 p-6 sm:p-8 shadow-xl group hover:border-[#67E8F9]/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#293549] text-[#67E8F9] flex items-center justify-center shadow-inner">
                        <span className="material-symbols-outlined text-[26px]">mail</span>
                      </div>
                      <div>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#859399] uppercase tracking-wider block font-semibold">
                          OFFICIAL EMAIL
                        </span>
                        <h3 className="text-xl font-bold text-[#F5F8FF] uppercase">
                          Commission Inquiries
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-3 py-1.5 bg-[#142032] hover:bg-[#1e2a3d] text-[#67E8F9] font-['JetBrains_Mono'] text-xs uppercase flex items-center gap-1.5 transition-colors border border-[#3c494e]/40"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedEmail ? 'done' : 'content_copy'}
                        </span>
                        <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                      </button>
                      <a
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#142032] hover:bg-[#293549] text-[#67E8F9] font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-colors border border-[#3c494e]/40"
                        href="mailto:commissions@voxelforcedev.com"
                      >
                        <span className="material-symbols-outlined text-[16px]">send</span>
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>
                  <div className="bg-[#030e20] p-3 font-['JetBrains_Mono'] text-sm text-[#4ae176] border border-[#1e2a3d]">
                    commissions@voxelforcedev.com
                  </div>
                </div>

                {/* Quick Process Info Note */}
                <div className="bg-[#0f1c2e] border border-[#1e2a3d] p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-2 font-['JetBrains_Mono'] text-xs text-[#4ae176] uppercase font-bold">
                    <span className="material-symbols-outlined text-[16px]">terminal</span>
                    <span>COMMISSION PROCESS READY</span>
                  </div>
                  <p className="text-xs text-[#bbc9cf] leading-relaxed">
                    Check the Frequently Asked Questions for details on software compatibility, pricing, and project timelines. When you have your idea ready, reach out on Discord or Email to get started!
                  </p>
                </div>
              </div>

              {/* Frequently Asked Questions (FAQ) - Replaces Commission Dispatch Form (7 cols) */}
              <div className="lg:col-span-7 bg-[#0B1F38]/95 border border-[#1e2a3d] hover:border-[#67E8F9]/40 p-6 sm:p-8 shadow-2xl relative transition-colors">
                {/* Terminal Header */}
                <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-[#1e2a3d] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4F]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFA726]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4ae176]"></span>
                    <h3 className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#F5F8FF] uppercase ml-1 font-bold">
                      FREQUENTLY ASKED QUESTIONS
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#67E8F9] uppercase bg-[#030e20] px-2 py-0.5 border border-[#1e2a3d]">
                      &lt;7 VERIFIED ANSWERS&gt;
                    </span>
                    <button
                      type="button"
                      onClick={toggleAllFaqs}
                      className="font-['JetBrains_Mono'] text-[10px] text-[#bbc9cf] hover:text-[#67E8F9] uppercase underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      {openFaqIds.length === FAQ_ITEMS.length ? 'Collapse All' : 'Expand All'}
                    </button>
                  </div>
                </div>

                {/* FAQ Items Accordion */}
                <div className="space-y-3">
                  {FAQ_ITEMS.map((item) => {
                    const isOpen = openFaqIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`border transition-all duration-200 overflow-hidden ${
                          isOpen
                            ? 'bg-[#0f1c2e] border-[#67E8F9]/50 shadow-md'
                            : 'bg-[#030e20]/80 border-[#1e2a3d] hover:border-[#3c494e]'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(item.id)}
                          aria-expanded={isOpen}
                          className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer group select-none"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span
                              className={`font-['JetBrains_Mono'] text-xs font-bold px-2 py-0.5 border transition-colors ${
                                isOpen
                                  ? 'bg-[#142032] text-[#67E8F9] border-[#67E8F9]/40'
                                  : 'bg-[#081528] text-[#859399] border-[#1e2a3d] group-hover:text-[#67E8F9]'
                              }`}
                            >
                              0{item.id}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-[#F5F8FF] group-hover:text-[#67E8F9] transition-colors leading-snug">
                              {item.question.replace(/^\d+\.\s*/, '')}
                            </span>
                          </div>
                          <div
                            className={`w-6 h-6 rounded flex items-center justify-center bg-[#142032] border border-[#1e2a3d] text-[#67E8F9] transition-transform duration-200 flex-shrink-0 ${
                              isOpen ? 'rotate-180 bg-[#1e2a3d]' : ''
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              expand_more
                            </span>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 border-t border-[#1e2a3d]/60 text-xs sm:text-sm text-[#bbc9cf] leading-relaxed space-y-2 animate-in fade-in duration-200">
                            {item.answer.map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* FAQ Footer Info */}
                <div className="mt-6 pt-4 border-t border-[#1e2a3d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#859399] font-['JetBrains_Mono']">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176]"></span>
                    <span>READY FOR NEW COMMISSIONS</span>
                  </div>
                  <span className="text-[#67E8F9]">EST. RESPONSE: &lt; 24H</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}



      {/* 9. FOOTER */}
      <footer className="w-full bg-[#030e20] border-t border-[#00b954]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <img
                    alt="Voxel Forge Developer Logo"
                    className="w-full h-full object-contain"
                    src={ASSETS.footerLogo}
                  />
                </div>
                <span className="text-lg font-bold text-[#F5F8FF]">WP VOXEL</span>
              </div>
              <p className="text-xs sm:text-sm text-[#bbc9cf] max-w-md leading-relaxed">
                Engineering ultra-low latency, mission-critical Paper, Purpur, and Folia plugins,
                distributed network orchestration, and custom game mechanics for premier Minecraft
                servers.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[#859399] font-['JetBrains_Mono'] text-xs">
                <span>V1.20.4+ ARCHITECTURE READY</span>
                <span>•</span>
                <span className="text-[#4ae176]">99.98% TICK STABILITY</span>
              </div>
            </div>

            <div>
              <h5 className="font-['JetBrains_Mono'] text-xs text-[#F5F8FF] uppercase mb-4 font-bold">
                Navigation
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-[#bbc9cf]">
                <li>
                  <a className="hover:text-[#67E8F9] transition-colors" href="#portfolio-projects">
                    Featured Systems
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#67E8F9] transition-colors" href="#services">
                    Plugin Engineering
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#67E8F9] transition-colors" href="#services">
                    Profiling & Audit
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#67E8F9] transition-colors" href="#about">
                    Architecture & Bio
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-['JetBrains_Mono'] text-xs text-[#F5F8FF] uppercase mb-4 font-bold">
                Connect
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-[#bbc9cf]">
                <li>
                  <a
                    className="hover:text-[#67E8F9] transition-colors"
                    href="https://discord.com/users/291955215446441984"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Discord Profile (wpvoxel)
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#67E8F9] transition-colors"
                    href="mailto:commissions@voxelforcedev.com"
                  >
                    commissions@voxelforcedev.com
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#67E8F9] transition-colors"
                    href="https://github.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub Registry
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#67E8F9] transition-colors"
                    href="#contact-section"
                  >
                    FAQ & Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#1e2a3d]/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-['JetBrains_Mono'] text-xs text-[#859399]">
            <div className="text-center sm:text-left">
              © 2024 VOXELFORGE DEV. All rights reserved. Engineering high-performance virtual worlds.
            </div>
            <div className="text-center sm:text-right text-[11px]">
              Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
            </div>
          </div>
        </div>
      </footer>

      {/* Plugin Video Demo Theater Modal */}
      {activeModalProject && (
        <PluginVideoModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
}

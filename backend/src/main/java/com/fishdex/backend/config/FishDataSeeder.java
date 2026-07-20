package com.fishdex.backend.config;

import com.fishdex.backend.model.Fish;
import com.fishdex.backend.model.FishLocation;
import com.fishdex.backend.repository.FishRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FishDataSeeder implements CommandLineRunner {

    private final FishRepository fishRepository;

    public FishDataSeeder(FishRepository fishRepository) {
        this.fishRepository = fishRepository;
    }

    @Override
    public void run(String... args) {
        fishRepository.deleteAll();

        fishRepository.saveAll(List.of(
                new Fish(
                        "largemouth-bass",
                        "Largemouth Bass",
                        "Micropterus salmoides",
                        "/fish/largemouth_bass.jpg",
                        "A popular freshwater game fish known for aggressive strikes and powerful fights.",
                        "Lakes, ponds, reservoirs, and slow-moving rivers",
                        "12-25 inches",
                        List.of("Soft plastics", "Spinnerbaits", "Jigs", "Topwater lures"),
                        List.of(
                                new FishLocation("coe-lake", "Coe Lake", 41.3703, -81.8543),
                                new FishLocation("hoover-reservoir", "Hoover Reservoir", 40.1017, -82.8799),
                                new FishLocation("lake-erie", "Lake Erie", 41.7300, -81.2500)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "smallmouth-bass",
                        "Smallmouth Bass",
                        "Micropterus dolomieu",
                        "/fish/smallmouth_bass.png",
                        "A hard-fighting bass species often found in clear rivers and rocky lakes.",
                        "Rivers, streams, and rocky lakes",
                        "10-20 inches",
                        List.of("Ned rigs", "Tube jigs", "Crankbaits", "Jerkbaits"),
                        List.of(
                                new FishLocation("rocky-river", "Rocky River", 41.4800, -81.8300),
                                new FishLocation("lake-erie", "Lake Erie", 41.7300, -81.2500),
                                new FishLocation("cuyahoga-river", "Cuyahoga River", 41.4993, -81.6944)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "bluegill",
                        "Bluegill",
                        "Lepomis macrochirus",
                        "/fish/bluegill.jpg",
                        "One of the most common sunfish species in North America.",
                        "Ponds, lakes, and slow-moving rivers",
                        "4-10 inches",
                        List.of("Worms", "Crickets", "Small jigs", "Float rigs"),
                        List.of(
                                new FishLocation("coe-lake", "Coe Lake", 41.3703, -81.8543),
                                new FishLocation("wallace-lake", "Wallace Lake", 41.3590, -81.8680),
                                new FishLocation("edgewater-park", "Edgewater Park", 41.4890, -81.7350)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "black-crappie",
                        "Black Crappie",
                        "Pomoxis nigromaculatus",
                        "/fish/black_crappie.jpg",
                        "A popular panfish with dark speckled markings.",
                        "Clear lakes, ponds, reservoirs, and backwaters",
                        "8-15 inches",
                        List.of("Minnows", "Small jigs", "Soft plastics"),
                        List.of(
                                new FishLocation("hoover-reservoir", "Hoover Reservoir", 40.1017, -82.8799),
                                new FishLocation("portage-lakes", "Portage Lakes", 41.0037, -81.5332),
                                new FishLocation("mosquito-lake", "Mosquito Lake", 41.3200, -80.7600)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "white-crappie",
                        "White Crappie",
                        "Pomoxis annularis",
                        "/fish/white_crappie.jpg",
                        "A schooling panfish commonly found in warm waters.",
                        "Reservoirs, ponds, and slow-moving rivers",
                        "8-15 inches",
                        List.of("Minnows", "Jigs", "Small spinners"),
                        List.of(
                                new FishLocation("hoover-reservoir", "Hoover Reservoir", 40.1017, -82.8799),
                                new FishLocation("alum-creek", "Alum Creek Lake", 40.1834, -82.9577),
                                new FishLocation("delaware-lake", "Delaware Lake", 40.3500, -83.0800)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "channel-catfish",
                        "Channel Catfish",
                        "Ictalurus punctatus",
                        "/fish/channel_catfish.png",
                        "The most common catfish species in North America.",
                        "Rivers, reservoirs, lakes, and ponds",
                        "15-30 inches",
                        List.of("Cut bait", "Chicken liver", "Nightcrawlers"),
                        List.of(
                                new FishLocation("cuyahoga-river", "Cuyahoga River", 41.4993, -81.6944),
                                new FishLocation("hoover-reservoir", "Hoover Reservoir", 40.1017, -82.8799),
                                new FishLocation("ohio-river", "Ohio River", 39.1000, -84.5000)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "flathead-catfish",
                        "Flathead Catfish",
                        "Pylodictis olivaris",
                        "/fish/flathead_catfish.jpg",
                        "A large predatory catfish known for reaching trophy size.",
                        "Large rivers, reservoirs, and deep channels",
                        "20-40 inches",
                        List.of("Live bait", "Bluegill", "Large minnows"),
                        List.of(
                                new FishLocation("ohio-river", "Ohio River", 39.1000, -84.5000),
                                new FishLocation("muskingum-river", "Muskingum River", 39.9400, -81.9900),
                                new FishLocation("scioto-river", "Scioto River", 39.9600, -83.0000)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "rainbow-trout",
                        "Rainbow Trout",
                        "Oncorhynchus mykiss",
                        "/fish/rainbow_trout.jpg",
                        "A colorful trout species stocked in many lakes and streams.",
                        "Cold lakes, streams, and stocked ponds",
                        "10-20 inches",
                        List.of("PowerBait", "Spinners", "Worms", "Small spoons"),
                        List.of(
                                new FishLocation("rocky-river", "Rocky River", 41.4800, -81.8300),
                                new FishLocation("chagrin-river", "Chagrin River", 41.4300, -81.3900),
                                new FishLocation("vermillion-river", "Vermilion River", 41.4200, -82.3600)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "northern-pike",
                        "Northern Pike",
                        "Esox lucius",
                        "/fish/northern_pike.jpg",
                        "An aggressive ambush predator with sharp teeth.",
                        "Weedy lakes, bays, and slow-moving rivers",
                        "20-40 inches",
                        List.of("Spinnerbaits", "Spoons", "Large swimbaits"),
                        List.of(
                                new FishLocation("lake-erie", "Lake Erie", 41.7300, -81.2500),
                                new FishLocation("sandusky-bay", "Sandusky Bay", 41.4600, -82.7500),
                                new FishLocation("mentor-lagoons", "Mentor Lagoons", 41.7200, -81.3600)
                        ),
                        0,
                        false
                ),
                new Fish(
                        "yellow-perch",
                        "Yellow Perch",
                        "Perca flavescens",
                        "/fish/yellow_perch.jpg",
                        "A highly popular table fish recognized by its vertical stripes.",
                        "Lakes, ponds, reservoirs, and nearshore waters",
                        "6-12 inches",
                        List.of("Minnows", "Worms", "Small jigs"),
                        List.of(
                                new FishLocation("lake-erie", "Lake Erie", 41.7300, -81.2500),
                                new FishLocation("edgewater-park", "Edgewater Park", 41.4890, -81.7350),
                                new FishLocation("fairport-harbor", "Fairport Harbor", 41.7500, -81.2800)
                        ),
                        0,
                        false
                )
        ));
    }
}
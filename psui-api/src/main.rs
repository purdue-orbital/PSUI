#![feature(proc_macro_hygiene, decl_macro)]

extern crate serde;
extern crate serde_json;

use serde::Serialize;
use serde::Deserialize;
use rand::Rng;
use rand::thread_rng;

#[macro_use] extern crate rocket;

/* Boilerplate

#[get("/<name>/<age>")]
fn hello(name: String, age: u8) -> String {
    format!("Hello, {} year old named {}!", age, name)
}

fn main() {
    rocket::ignite()
        .mount("/hello", routes![hello])
        .launch();
}

*/

#[derive(Serialize, Deserialize)]
struct SpacialCoordinates {
    x: u8,
    y: u8,
    z: u8
}

#[derive(Serialize, Deserialize)]
struct Data {
    altitude: u8,
    longitude: u8,
    latitude: u8,
    gyro: SpacialCoordinates,
    temperature: u8,
    acceleration: SpacialCoordinates
}

#[get("/time/getdata")]
fn getdata() -> std::string::String {
    let mut rng = thread_rng();   // This is a temporary random number generator

    let g = SpacialCoordinates {
        x: rng.gen_range(0..10),
        y: rng.gen_range(0..10),
        z: rng.gen_range(0..10)
    };

    let a = SpacialCoordinates {
        x: rng.gen_range(0..10),
        y: rng.gen_range(0..10),
        z: rng.gen_range(0..10)
    };

    let data = Data {
        altitude: rng.gen_range(0..255),
        longitude: rng.gen_range(0..255),
        latitude: rng.gen_range(0..180),
        gyro: g,
        temperature: rng.gen_range(0..100),
        acceleration: a
    };

    return serde_json::to_string(&data).unwrap();
}

fn main() {
    rocket::ignite()
        .mount("/", routes![getdata])
        .launch();
}






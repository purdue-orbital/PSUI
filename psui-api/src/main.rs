#![feature(proc_macro_hygiene, decl_macro)]

extern crate serde;
extern crate serde_json;

use serde::Serialize;
use serde::Deserialize;

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
    let g = SpacialCoordinates {
        x: 0,
        y: 0,
        z: 0
    };

    let a = SpacialCoordinates {
        x: 0,
        y: 0,
        z: 0
    };

    let data = Data {
        altitude: 0,
        longitude: 0,
        latitude: 0,
        gyro: g,
        temperature: 0,
        acceleration: a
    };

    return serde_json::to_string(&data).unwrap();
}

fn main() {
    rocket::ignite()
        .mount("/", routes![getdata])
        .launch();
}






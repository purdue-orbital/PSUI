#![feature(proc_macro_hygiene, decl_macro)]

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

#[get("/time/<time>/getdata")]
fn getdata(time: u16) -> String
    println!("I have no data yet!");
}

fn main() {
    rocket::ignite()
        .mount("/time", routes![getdata])
        .launch();
}






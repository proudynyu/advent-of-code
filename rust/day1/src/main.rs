use std::{fs::File, io::{BufReader, Read}};

fn main() -> std::io::Result<()> {
    let file = File::open("./input.txt")?;

    let mut buf_reader = BufReader::new(file);
    let mut contents = String::new();

    buf_reader.read_to_string(&mut contents).expect("Error reading buffer");

    let parts = contents.split("\n\n");

    let mut sum_vec: Vec<i64> = Vec::new();

    for x in parts.into_iter() {
        let mut sum = 0i64;
        let numbers = x.split("\n").into_iter();

        for y in numbers {
            let n = y.trim().parse::<i64>().unwrap();

            sum = sum + n;
        }

        sum_vec.push(sum)
    }

    dbg!(sum_vec);
    Ok(())
}

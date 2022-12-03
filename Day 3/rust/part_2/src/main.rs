fn main() {
    let input = include_str!("../../../input")
        .trim()
        .split("\n")
        .collect::<Vec<&str>>();

    let mut score: u32 = 0;

    for i in 0..input.len() / 3 {
        let backpacks = vec![input[i*3 + 1], input[i*3 + 2]];
        let mut matching = String::new();

        for item in input[i*3].chars() {
            if backpacks[0].contains(item) && backpacks[1].contains(item) {
                matching.push(item);
            }
        }

        score += get_char_priority(matching.chars().nth(0).unwrap()) as u32;
    }

    println!("{}", score);
}

fn get_char_priority(item: char) -> u8 {
    if item.is_uppercase() { return (item as u8) - 38; }
    if item.is_lowercase() { return (item as u8) - 96; }

    unreachable!();
}

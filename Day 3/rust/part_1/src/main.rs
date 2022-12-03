fn main() {
    let input = include_str!("../../../input").trim();

    let mut score: u32 = 0;

    for line in input.split("\n") {
        let left: String = line.chars().take(line.len() / 2).collect();
        let right: String = line.chars().skip(line.len() / 2).collect();
        let mutual_item = get_matching_char(&left, &right);
        score += get_char_priority(mutual_item) as u32;
    }

    println!("{}", score);
}

fn get_matching_char(left: &str, right: &str) -> char {
    for char in left.chars() {
        if right.contains(char) { return char; }
    }

    unreachable!();
}

fn get_char_priority(item: char) -> u8 {
    if item.is_uppercase() { return (item as u8) - 38; }
    if item.is_lowercase() { return (item as u8) - 96; }

    unreachable!();
}

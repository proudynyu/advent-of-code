{_, input} = File.read("./input")

list = 
   String.split(input, "")
  |> Enum.map(fn char ->
    cond do
      "#{char}" === "(" ->
        1
      "#{char}" === ")" ->
        -1
      true ->
        0
    end
  end)

part_one = Enum.sum(list)

part_two = Enum.scan(list, &(&1 + &2))
  |> Enum.find_index(fn num -> num === -1 end)

IO.puts("part 1: #{part_one}")
IO.puts("part 2: #{part_two}")


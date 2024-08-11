{_, input} = File.read("./input")

count = 
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
  |> Enum.sum()

  IO.puts(count)

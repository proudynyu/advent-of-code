defmodule Main do
  @spec read_file(String.t()) :: list()
  def read_file(filename) do
    {_, file} = File.read(filename)
    file
    |> String.split("\n")
    |> Enum.map(fn x ->
      String.split(x, "  ")
      |> Enum.map(fn y -> String.trim(y) end)
    end)
    |> Enum.filter(fn x -> length(x) > 1 end)
  end

  defp separate_lists([], acc), do: acc
  defp separate_lists([head | tail], [one, two]) do
    [x, y] = head
    acc = [[x | one], [y | two]]
    separate_lists(tail, acc)
  end

  defp join_lists([], acc), do: acc
  defp join_lists([[], []], acc), do: acc
  defp join_lists([one, two], acc) do
    [head_one | tail_one] = one
    [head_two | tail_two] = two
    value = abs(String.to_integer(head_two) - String.to_integer(head_one))
    join_lists([tail_one, tail_two], [value | acc])
  end

  def resolve_part_1(list_of_list) do
    acc = [[], []]
    separate_lists(list_of_list, acc)
    |> Enum.map(fn list ->
      Enum.sort(list, &(&1 <= &2))
    end)
    |> join_lists([])
    |> Enum.sum()
  end

  def calculate_freq(_freq, [], acc), do: acc 
  def calculate_freq(freq, [head | tail], acc) do
    value = freq[head]
    if value === nil do
      new_acc = [0 | acc]
      calculate_freq(freq, tail, new_acc)
    else
      new_acc = [value * String.to_integer(head) | acc]
      calculate_freq(freq, tail, new_acc)
    end
  end

  def resolver_part_2(list_of_list) do
    acc = [[], []]
    [one, two] = separate_lists(list_of_list, acc)
    freq = Enum.frequencies(two)

    calculate_freq(freq, one, [])
    |> Enum.sum()
  end
end

Main.read_file("./example.txt")
|> Main.resolve_part_1
|> IO.inspect

Main.read_file("./input.txt")
|> Main.resolver_part_2
|> IO.inspect


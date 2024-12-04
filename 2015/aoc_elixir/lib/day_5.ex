defmodule Utils do 
  @spec read_file(String.t()) :: String.t()
  def read_file(filename) do
    filename
    |> File.read()
    |> case do
      {:ok, file} -> 
        file
        |> String.trim()
      _ -> IO.puts("error reading file {filename}")
    end
  end

  @spec split_file_line(String.t()) :: list(String.t())
  def split_file_line(file) do
    file
    |> String.split("\n")
  end
end

defmodule PartOne do
  @spec vowels_list() :: list(String.t())
  defp vowels_list() do
    "aeiou"
     |> String.graphemes()
  end

  @spec no_forbiden_substrings?(String.t()) :: boolean()
  defp no_forbiden_substrings?(line) do
    not String.contains?(line, ["ab", "cd", "pq", "xy"])
  end

  @spec has_three_vowels?(String.t(), list(String.t())) :: boolean()
  defp has_three_vowels?(line, vowels) do
    line
    |> String.graphemes()
    |> Enum.reduce(0, fn letter, acc -> 
      if letter in vowels, do: acc + 1, else: acc
      # case Enum.member?(vowels, letter) do
      #   true -> acc + 1
      #   _ -> acc
      # end
    end)
    |> (&(&1 >= 3)).()
    # case do
    #     x when x >= 3 -> true
    #     _ -> false
    #   end
  end

  @spec has_double_alpha_letter?(String.t()) :: boolean()
  defp has_double_alpha_letter?(line) do
    line
    |> String.graphemes()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
    # |> Enum.chunk_by(fn arg -> arg end)
    # |> Enum.map(fn arg -> to_string(arg) end)
    # |> Enum.filter(fn x -> String.length(x) > 1 end)
    # |> length()
    # |> case do
    #   x when x > 0 -> true
    #   _ -> false
    # end
  end

  @spec resolve(String.t()) :: non_neg_integer()
  def resolve(filename) do
    vowels = vowels_list()

    filename
      |> Utils.read_file()
      |> Utils.split_file_line()
      |> Enum.filter(fn line ->
          no_forbiden_substrings?(line)
          and has_double_alpha_letter?(line)
          and has_three_vowels?(line, vowels)
      end)
      |> length()
  end
end

defmodule PartTwo do
  @spec resolve(String.t()) :: non_neg_integer()
  def resolve(filename) do
    filename
    |> Utils.read_file()
    |> Utils.split_file_line()
    |> Enum.filter(fn line ->
        not has_three_letter_together?(line) and
      recursive_identify_double?(line) 
      # has_same_letter_with_one_between?(line) and
    end)
    |> length
  end

  @spec recursive_identify_double?(String.t()) :: boolean()
  def recursive_identify_double?(line) when byte_size(line) < 2, do: false
  def recursive_identify_double?(line) do
    double_letter = String.slice(line, 0, 2)
    letters = String.slice(line, 2..-1//1)
    
    case String.match?(letters, ~r/#{double_letter}/) do
      true -> true
      false -> recursive_identify_double?(letters)
    end
  end

  @spec has_same_letter_with_one_between?(String.t()) :: boolean()
  def has_same_letter_with_one_between?(line) when byte_size(line) < 3, do: false
  def has_same_letter_with_one_between?(line) do
    graphemes = String.graphemes(line)
    
    graphemes
    |> Enum.with_index()
    |> Enum.any?(fn {char, index} -> 
      index + 2 < length(graphemes) and char == Enum.at(graphemes, index + 2)
    end)
  end

  @spec has_three_letter_together?(String.t()) :: boolean()
  def has_three_letter_together?(line) when byte_size(line) < 3, do: false
  def has_three_letter_together?(line) do
    graph = String.graphemes(line)
    graph_length = length(graph)
    
    Enum.any?(0..(graph_length - 3), fn index ->
      char = Enum.at(graph, index)
      char === Enum.at(graph, index + 1) and char === Enum.at(graph, index + 2)
    end)
  end
end

part_one = "example"
PartOne.resolve(part_one)
  |> IO.inspect()

part_two = "input"
PartTwo.resolve(part_two)
|> IO.inspect()

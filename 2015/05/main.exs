defmodule Resolver do
  @spec read_file(String.t()) :: String.t()
  defp read_file(filename) do
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
  defp split_file_line(file) do
    file
    |> String.split("\n")
  end

  @spec not_allowed?(String.t())
  defp not_allowed?(line) do
    must_not_contain = ["ab", "cd", "pq", "xy"]
    line
      |> String.contains?(must_not_contain)
  end

  @spec has_double_vowels?(String.t(), list(String.t()))
  defp has_double_vowels?(line, doubles_vowels) do
    # TODO
  end

  @spec create_vowels() :: list(String.t())
  defp create_vowels() do
    "aeiou"
      |> String.split()
  end

  @spec create_double_alphabet() :: list(String.t())
  defp create_double_alphabet() do
    Enum.map(65..90, fn n -> 
      String.downcase(<<n>><><<n>>)
    end)
  end

  @spec has_double_alpha_letter?(String.t(), list(String.t()))
  defp has_double_alpha_letter?(line, double_alpha) do
  end

  @spec part_one(String.t()) :: Integer.t()
  def part_one(filename) do
    doubl_alpha = create_double_alphabet()
    vowels = create_vowels()

    filename
      |> read_file()
      |> split_file_line()
      |> Enum.filter(fn line ->
          not not_allowed?(line)
          and has_double_alpha_letter?(line, double_alpha)
          and duplicate_vowels(line, vowels)
      end)
  end
end

filename = "example"
Resolver.part_one(filename)
  |> IO.inspect()


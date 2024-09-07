defmodule Resolver do
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

  # @spec not_allowed?(String.t())
  # def not_allowed?(_line) do
  # end
  #
  # @spec has_double_vowels?(String.t())
  # def has_double_vowels?(_line) do
  # end
  #
  # @spec create_double_alphabet() :: List.t()
  # def create_double_alphabet() do
  # end
end

filename = "example"
Resolver.read_file(filename)
|> IO.puts()

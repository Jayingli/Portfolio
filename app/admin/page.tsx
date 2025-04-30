"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { aiConfig } from "@/lib/ai-config"

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [settings, setSettings] = useState(aiConfig)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  // Check if admin mode is enabled via environment variable
  useEffect(() => {
    const showAdmin = process.env.NEXT_PUBLIC_SHOW_ADMIN === "true"
    setIsAdmin(showAdmin)
  }, [])

  const handleLogin = () => {
    // This is a simple check - in a real app, you'd use a more secure method
    if (password === "portfolio-admin") {
      setIsAdmin(true)
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  const handleSave = () => {
    // In a real app, you'd save these settings to a database or API
    // For now, we'll just show a success message
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin()
                  }}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Portfolio AI Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Model Configuration</CardTitle>
            <CardDescription>Configure the AI model used for chat responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="model">OpenAI Model</Label>
              <select
                id="model"
                className="w-full p-2 border rounded-md"
                value={settings.model}
                onChange={(e) => setSettings({ ...settings, model: e.target.value })}
              >
                <option value="gpt-4o">GPT-4o (Recommended)</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="temperature">Temperature: {settings.temperature}</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.temperature < 0.3
                    ? "More focused"
                    : settings.temperature > 0.7
                      ? "More creative"
                      : "Balanced"}
                </span>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={(value) => setSettings({ ...settings, temperature: value[0] })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Response Length: {settings.maxTokens} tokens</Label>
              <Slider
                id="maxTokens"
                min={100}
                max={1000}
                step={50}
                value={[settings.maxTokens]}
                onValueChange={(value) => setSettings({ ...settings, maxTokens: value[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Approximately {Math.round(settings.maxTokens * 0.75)} words
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="useStreaming"
                checked={settings.useStreaming}
                onCheckedChange={(checked) => setSettings({ ...settings, useStreaming: checked })}
              />
              <Label htmlFor="useStreaming">Enable streaming responses</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Settings</CardTitle>
            <CardDescription>Configure how the AI responds to users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fallbackMessage">Fallback Message</Label>
              <Textarea
                id="fallbackMessage"
                value={settings.fallbackMessage}
                onChange={(e) => setSettings({ ...settings, fallbackMessage: e.target.value })}
                rows={2}
              />
              <p className="text-xs text-muted-foreground">Shown when the AI encounters an error</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outOfScopeResponse">Out of Scope Response</Label>
              <Textarea
                id="outOfScopeResponse"
                value={settings.outOfScopeResponse}
                onChange={(e) => setSettings({ ...settings, outOfScopeResponse: e.target.value })}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Shown when users ask questions outside of your portfolio content
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSettings(aiConfig)}>
              Reset to Default
            </Button>
            <Button onClick={handleSave}>{saved ? "Saved!" : "Save Settings"}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

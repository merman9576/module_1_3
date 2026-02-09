"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/features/LoginForm";
import type { LoginFormData } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "로그인에 실패했습니다.");
      }

      // 로그인 성공 시 토큰 저장 (예: localStorage 또는 쿠키)
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }

      // 대시보드로 리다이렉트
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 로고 및 제목 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">LogWatch Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          로그 모니터링 대시보드에 로그인하세요
        </p>
      </div>

      {/* 로그인 카드 */}
      <Card variant="elevated" padding="lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">로그인</h2>
        </div>

        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
        />
      </Card>

      {/* 회원가입 링크 */}
      <Card variant="default" padding="md">
        <p className="text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </Card>
    </div>
  );
}
